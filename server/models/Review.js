import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    customerName: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Please provide review comment']
    },
    verified: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;

