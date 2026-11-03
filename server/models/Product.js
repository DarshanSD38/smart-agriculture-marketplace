import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: [
        'Vegetables',
        'Fruits',
        'Grains',
        'Milk/Farm Products',
        'Fertilizers',
        'Seeds',
        'Tools',
        'Equipment',
        'Irrigation Supplies',
        'Farm Supplies'
      ]
    },
    price: {
      type: Number,
      required: [true, 'Please provide unit price'],
      min: [0, 'Price cannot be negative']
    },
    unit: {
      type: String,
      default: 'kg'
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide total harvest quantity'],
      min: [0, 'Quantity cannot be negative']
    },
    availableQuantity: {
      type: Number,
      required: [true, 'Please provide available stock quantity'],
      min: [0, 'Stock cannot be negative']
    },
    harvestDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    location: {
      type: String,
      default: 'Maharashtra'
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    farmerName: {
      type: String,
      required: true
    },
    farmerLocation: {
      type: String,
      default: 'Nashik, Maharashtra'
    },
    distanceKm: {
      type: Number,
      default: 4.2
    },
    source: {
      type: String,
      default: 'Direct Farm Harvest'
    },
    organic: {
      type: Boolean,
      default: true
    },
    grade: {
      type: String,
      default: 'Grade A'
    },
    status: {
      type: String,
      enum: ['Fresh Harvest', 'In Stock', 'Limited Stock', 'Out of Stock'],
      default: 'Fresh Harvest'
    },
    rating: {
      type: Number,
      default: 4.8
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    mandiPriceBenchmark: {
      type: Number,
      default: 0
    },
    priceHistory: [
      {
        date: String,
        price: Number
      }
    ],
    // For Agri-Input products (seeds, fertilizers, tools, equipment, etc.)
    isAgriInput: {
      type: Boolean,
      default: false
    },
    brand: {
      type: String,
      default: ''
    },
    dosage: {
      type: String,
      default: ''
    },
    recommendedFor: [{ type: String }],
    stock: {
      type: Number,
      default: 50
    }
  },
  { timestamps: true }
);

// Virtual field to check in-stock status
productSchema.virtual('inStock').get(function () {
  return this.availableQuantity > 0;
});

const Product = mongoose.model('Product', productSchema);
export default Product;

