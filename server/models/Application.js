import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LabourJob',
      required: true
    },
    labourer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    jobTitle: { type: String, required: true },
    farmerName: { type: String, required: true },
    labourerName: { type: String, required: true },
    labourerPhone: { type: String, required: true },
    labourerSkills: [{ type: String }],
    dailyWage: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    },
    appliedDate: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;

