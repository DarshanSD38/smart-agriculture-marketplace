import mongoose from 'mongoose';

const groupBuySchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    farmerName: { type: String, required: true },
    category: { type: String, default: 'Vegetables' },
    image: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    groupPrice: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    groupQuantityRequired: { type: Number, required: true },
    currentDemandPledged: { type: Number, default: 0 },
    remainingQuantity: { type: Number, required: true },
    participantsCount: { type: Number, default: 0 },
    endsInHours: { type: Number, default: 24 },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Expired'],
      default: 'Active'
    },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        quantity: { type: Number, required: true },
        pledgedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

const GroupBuy = mongoose.model('GroupBuy', groupBuySchema);
export default GroupBuy;

