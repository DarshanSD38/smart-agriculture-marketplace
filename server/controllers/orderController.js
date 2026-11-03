import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';

// @desc    Place a new order & reduce inventory
// @route   POST /api/orders
// @access  Private (Customer)
export const createOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, customerName, customerPhone, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items in order'
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Delivery address is required'
      });
    }

    let subtotal = 0;
    const verifiedItems = [];
    const affectedFarmers = new Set();

    // 1. Validate availability and calculate totals
    for (const item of items) {
      const productId = item.productId || item.id || item._id;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product "${item.name}" is no longer available in the marketplace.`
        });
      }

      if (product.availableQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.availableQuantity} ${product.unit} remaining.`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit || 'kg',
        image: product.image,
        farmer: product.farmer
      });

      if (product.farmer) {
        affectedFarmers.add(product.farmer.toString());
      }
    }

    // 2. Calculate delivery fee
    const deliveryFee = subtotal > 300 ? 0 : 30;
    const total = subtotal + deliveryFee;

    // 3. Atomically reduce product available stock
    for (const item of verifiedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { availableQuantity: -item.quantity }
      });
    }

    // 4. Create Order
    const order = await Order.create({
      customer: req.user._id,
      customerName: customerName || req.user.name,
      customerPhone: customerPhone || req.user.phone,
      deliveryAddress,
      items: verifiedItems,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: paymentMethod?.includes('Cash') ? 'Pending (COD)' : 'Paid',
      orderStatus: 'Placed',
      trackingSteps: [
        {
          status: 'Placed',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          done: true,
          desc: 'Order placed successfully by customer'
        },
        {
          status: 'Confirmed',
          timestamp: 'Pending farmer check',
          done: false,
          desc: 'Farmer confirmation awaited'
        },
        {
          status: 'Preparing',
          timestamp: 'Awaiting prep',
          done: false,
          desc: 'Fresh harvest & packaging at farm'
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Pending dispatch',
          done: false,
          desc: 'Handover to direct eco-courier'
        },
        {
          status: 'Delivered',
          timestamp: 'Estimated 2-3 hours',
          done: false,
          desc: 'Package arrives at your doorstep'
        }
      ]
    });

    // 5. Send Notification to each farmer
    for (const farmerId of affectedFarmers) {
      await Notification.create({
        recipient: farmerId,
        roleTarget: 'farmer',
        type: 'new_order',
        title: 'New Customer Order Received!',
        message: `New Order #${order._id.toString().slice(-6).toUpperCase()} received from ${order.customerName}.`,
        link: '/farmer/orders'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully and stock updated',
      order: {
        ...order.toObject(),
        id: order._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer's orders
// @route   GET /api/orders/my
// @access  Private (Customer)
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });

    const formatted = orders.map(o => ({
      ...o.toObject(),
      id: o._id.toString(),
      date: new Date(o.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    }));

    res.json({
      success: true,
      count: formatted.length,
      orders: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get orders received by farmer
// @route   GET /api/orders/farmer
// @access  Private (Farmer)
export const getFarmerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.farmer': req.user._id }).sort({ createdAt: -1 });

    const formatted = orders.map(o => ({
      ...o.toObject(),
      id: o._id.toString(),
      date: new Date(o.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    }));

    res.json({
      success: true,
      count: formatted.length,
      orders: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order details by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        ...order.toObject(),
        id: order._id.toString(),
        date: new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status stage
// @route   PUT /api/orders/:id/status
// @access  Private (Farmer, Admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowed.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const statusOrder = ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const targetIndex = statusOrder.indexOf(status);

    const updatedSteps = order.trackingSteps.map((step, idx) => {
      const isDone = idx <= targetIndex;
      return {
        status: step.status,
        desc: step.desc,
        done: isDone,
        timestamp: isDone
          ? (step.timestamp.includes('Pending') || step.timestamp.includes('Awaiting')
              ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
              : step.timestamp)
          : step.timestamp
      };
    });

    order.orderStatus = status;
    order.trackingSteps = updatedSteps;

    if (status === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    // Notify customer
    await Notification.create({
      recipient: order.customer,
      roleTarget: 'customer',
      type: 'order_status',
      title: `Order Status Updated: ${status}`,
      message: `Your order #${order._id.toString().slice(-6).toUpperCase()} is now ${status}.`,
      link: `/customer/orders/track/${order._id}`
    });

    res.json({
      success: true,
      message: `Order status advanced to ${status}`,
      order: {
        ...order.toObject(),
        id: order._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
// @access  Private (Admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    const formatted = orders.map(o => ({
      ...o.toObject(),
      id: o._id.toString(),
      date: new Date(o.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    }));

    res.json({
      success: true,
      count: formatted.length,
      orders: formatted
    });
  } catch (error) {
    next(error);
  }
};

