import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['farmer', 'customer', 'labour', 'admin'],
      default: 'customer',
      required: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please provide location/city'],
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended'],
      default: 'Active'
    },
    verified: {
      type: Boolean,
      default: true
    },
    // Farmer fields
    farmName: { type: String, default: '' },
    farmSize: { type: String, default: '' },
    bio: { type: String, default: '' },
    crops: [{ type: String }],
    
    // Customer fields
    address: { type: String, default: '' },
    
    // Labour fields
    skills: [{ type: String }],
    experience: { type: String, default: '1 Year' },
    experienceYears: { type: Number, default: 1 },
    dailyWage: { type: Number, default: 500 },
    availability: {
      type: String,
      enum: ['Immediate', 'Available Tomorrow', 'Next Week', 'Not Available'],
      default: 'Immediate'
    },
    completedJobs: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 }
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

