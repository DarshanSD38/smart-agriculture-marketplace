import Product from '../models/Product.js';

// @desc    Get all products with search, category & price filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      maxPrice,
      organicOnly,
      isAgriInput,
      sortBy,
      farmerId
    } = req.query;

    let query = {};

    // Filter produce vs agri-input
    if (isAgriInput === 'true') {
      query.isAgriInput = true;
    } else if (isAgriInput === 'false') {
      query.isAgriInput = { $ne: true };
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    // Farmer ID filter
    if (farmerId) {
      query.farmer = farmerId;
    }

    // Organic filter
    if (organicOnly === 'true') {
      query.organic = true;
    }

    // Price filter
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    // Text search
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { description: regex },
        { farmerName: regex },
        { farmerLocation: regex },
        { category: regex }
      ];
    }

    let sort = { createdAt: -1 }; // default: latest

    if (sortBy === 'price_asc') {
      sort = { price: 1 };
    } else if (sortBy === 'price_desc') {
      sort = { price: -1 };
    } else if (sortBy === 'rating') {
      sort = { rating: -1 };
    } else if (sortBy === 'freshness') {
      sort = { harvestDate: -1 };
    }

    const products = await Product.find(query).sort(sort);

    // Map to maintain backward compatibility with frontend fields (e.g. id: p._id)
    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      products: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name farmName phone location avatar rating verified');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found with specified ID'
      });
    }

    res.json({
      success: true,
      product: {
        ...product.toObject(),
        id: product._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product listing
// @route   POST /api/products
// @access  Private (Farmer, Admin)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      unit,
      quantity,
      harvestDate,
      location,
      description,
      image,
      organic,
      status,
      grade,
      isAgriInput,
      brand,
      dosage,
      recommendedFor
    } = req.body;

    const initialPrice = Number(price);
    const initialQty = Number(quantity);

    const product = await Product.create({
      name,
      category,
      price: initialPrice,
      unit: unit || 'kg',
      quantity: initialQty,
      availableQuantity: initialQty,
      harvestDate: harvestDate || new Date().toISOString().split('T')[0],
      location: location || req.user.location,
      description,
      image: image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      farmer: req.user._id,
      farmerName: req.user.name,
      farmerLocation: req.user.location,
      source: req.user.farmName || 'Direct Organic Farm',
      organic: organic !== undefined ? organic : true,
      status: status || 'Fresh Harvest',
      grade: grade || 'Grade A',
      isAgriInput: isAgriInput || false,
      brand: brand || '',
      dosage: dosage || '',
      recommendedFor: recommendedFor || [],
      priceHistory: [{ date: 'Current', price: initialPrice }]
    });

    res.status(201).json({
      success: true,
      message: 'Product listing created successfully',
      product: {
        ...product.toObject(),
        id: product._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product details
// @route   PUT /api/products/:id
// @access  Private (Farmer owner, Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Verify ownership or admin privileges
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to update another farmer\'s product'
      });
    }

    const updates = req.body;

    if (updates.price && Number(updates.price) !== product.price) {
      product.priceHistory.push({
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Number(updates.price)
      });
    }

    Object.keys(updates).forEach(key => {
      if (key !== '_id' && key !== 'farmer') {
        product[key] = updates[key];
      }
    });

    const updated = await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: {
        ...updated.toObject(),
        id: updated._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product listing
// @route   DELETE /api/products/:id
// @access  Private (Farmer owner, Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Verify ownership or admin privileges
    if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to delete another farmer\'s product'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product listing removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products belonging to logged in farmer
// @route   GET /api/products/farmer/my
// @access  Private (Farmer)
export const getMyFarmerProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });

    const formatted = products.map(p => ({
      ...p.toObject(),
      id: p._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      products: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload product or crop image
// @route   POST /api/products/upload
// @access  Private
export const uploadProductImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please select an image file to upload'
    });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl: fileUrl,
    filename: req.file.filename
  });
};

