import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unit: { type: String, default: 'kg' },
  image: { type: String },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const trackingStepSchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: String, default: 'Pending' },
  done: { type: Boolean, default: false },
  desc: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'UPI / Online Paid', 'Cash on Delivery', 'Card'],
      default: 'UPI'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Paid on Delivery', 'Failed'],
      default: 'Paid'
    },
    orderStatus: {
      type: String,
      enum: ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Placed'
    },
    trackingSteps: [trackingStepSchema]
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;

