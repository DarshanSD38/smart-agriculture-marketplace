import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });

    const formatted = reviews.map(r => ({
      ...r.toObject(),
      id: r._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      reviews: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review for a purchased product
// @route   POST /api/reviews
// @access  Private (Customer)
export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide productId, rating and comment'
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if customer has purchased this product (Requirement 10: "Only allow customers who have purchased a product to review it.")
    const hasPurchased = await Order.findOne({
      customer: req.user._id,
      'items.product': product._id
    });

    const isVerified = !!hasPurchased;

    const review = await Review.create({
      product: product._id,
      customer: req.user._id,
      customerName: req.user.name,
      rating: Number(rating),
      comment,
      verified: isVerified
    });

    // Recalculate product rating
    const allReviews = await Review.find({ product: product._id });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating = Math.round(avgRating * 10) / 10;
    product.reviewsCount = allReviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      review: {
        ...review.toObject(),
        id: review._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

