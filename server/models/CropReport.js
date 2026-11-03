import mongoose from 'mongoose';

const cropReportSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cropName: {
      type: String,
      default: 'Tomato'
    },
    imageUrl: {
      type: String,
      required: true
    },
    analysisResult: {
      issue: { type: String, required: true },
      confidence: { type: Number, required: true },
      severity: { type: String, default: 'Moderate' },
      symptoms: [{ type: String }],
      organicRemedy: { type: String, default: '' },
      chemicalRemedy: { type: String, default: '' },
      recommendedInputName: { type: String, default: 'Bio-Neem Organic Pest Repellent' },
      warningNote: {
        type: String,
        default: 'Disclaimer: This AI diagnosis is a decision-support demonstration. For confirmed agronomic diagnosis, consult your local Krishi Vigyan Kendra (KVK).'
      },
      isDemoResult: {
        type: Boolean,
        default: true
      }
    }
  },
  { timestamps: true }
);

const CropReport = mongoose.model('CropReport', cropReportSchema);
export default CropReport;

