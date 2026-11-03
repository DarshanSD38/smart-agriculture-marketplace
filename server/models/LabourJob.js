import mongoose from 'mongoose';

const labourJobSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    farmerName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please provide farm location'],
      trim: true
    },
    requiredSkill: {
      type: String,
      required: [true, 'Please provide required agricultural skill']
    },
    workersNeeded: {
      type: Number,
      required: true,
      min: 1
    },
    workersApplied: {
      type: Number,
      default: 0
    },
    startDate: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      default: '3 Days'
    },
    dailyPayment: {
      type: Number,
      required: true,
      min: 0
    },
    perks: {
      type: String,
      default: 'Lunch & Refreshments provided'
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Open'
    }
  },
  { timestamps: true }
);

const LabourJob = mongoose.model('LabourJob', labourJobSchema);
export default LabourJob;

