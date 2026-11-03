import Product from '../models/Product.js';

// @desc    Get inventory summary and items for farmer
// @route   GET /api/inventory
// @access  Private (Farmer)
export const getFarmerInventory = async (req, res, next) => {
  try {
    const products = await Product.find({ farmer: req.user._id });

    const totalStock = products.reduce((sum, p) => sum + (p.availableQuantity || 0), 0);
    const totalValue = products.reduce((sum, p) => sum + ((p.availableQuantity || 0) * (p.price || 0)), 0);

    const perishableItems = products.filter(
      p => p.category === 'Vegetables' || p.category === 'Milk/Farm Products'
    );

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));

    res.json({
      success: true,
      summary: {
        totalStock,
        totalValue,
        perishableRiskCount: perishableItems.length,
        totalItemsCount: products.length
      },
      inventory: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock quantity for a product
// @route   PUT /api/inventory/:id
// @access  Private (Farmer)
export const updateStock = async (req, res, next) => {
  try {
    const { availableQuantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to adjust inventory for another farmer\'s product'
      });
    }

    product.availableQuantity = Number(availableQuantity);
    if (product.availableQuantity <= 0) {
      product.status = 'Out of Stock';
    } else if (product.availableQuantity < 20) {
      product.status = 'Limited Stock';
    } else {
      product.status = 'In Stock';
    }

    await product.save();

    res.json({
      success: true,
      message: 'Stock updated successfully',
      product: {
        ...product.toObject(),
        id: product._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

