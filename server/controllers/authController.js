import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecret_agri_smart_jwt_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user (Farmer, Customer, Labour)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      location,
      farmName,
      farmSize,
      address,
      skills,
      dailyWage,
      experience
    } = req.body;

    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, password, phone, location).'
      });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    const userData = {
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'customer',
      phone,
      location,
      farmName: farmName || '',
      farmSize: farmSize || '',
      address: address || '',
      dailyWage: dailyWage ? Number(dailyWage) : 500,
      experience: experience || '1 Year'
    };

    if (skills) {
      userData.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    }

    const user = await User.create(userData);

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        verified: user.verified,
        farmName: user.farmName,
        farmSize: user.farmSize,
        address: user.address,
        skills: user.skills,
        dailyWage: user.dailyWage
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    // Check user with password selected
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials'
      });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended by an administrator.'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        verified: user.verified,
        farmName: user.farmName,
        farmSize: user.farmSize,
        address: user.address,
        skills: user.skills,
        dailyWage: user.dailyWage,
        status: user.status
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        location: user.location,
        avatar: user.avatar,
        verified: user.verified,
        farmName: user.farmName,
        farmSize: user.farmSize,
        bio: user.bio,
        crops: user.crops,
        address: user.address,
        skills: user.skills,
        experience: user.experience,
        dailyWage: user.dailyWage,
        availability: user.availability,
        rating: user.rating,
        status: user.status
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const allowedFields = [
      'name',
      'phone',
      'location',
      'avatar',
      'farmName',
      'farmSize',
      'bio',
      'crops',
      'address',
      'skills',
      'experience',
      'dailyWage',
      'availability'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'skills' && typeof req.body.skills === 'string') {
          user.skills = req.body.skills.split(',').map(s => s.trim());
        } else {
          user[field] = req.body[field];
        }
      }
    });

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        location: updatedUser.location,
        avatar: updatedUser.avatar,
        verified: updatedUser.verified,
        farmName: updatedUser.farmName,
        farmSize: updatedUser.farmSize,
        bio: updatedUser.bio,
        address: updatedUser.address,
        skills: updatedUser.skills,
        experience: updatedUser.experience,
        dailyWage: updatedUser.dailyWage,
        availability: updatedUser.availability
      }
    });
  } catch (error) {
    next(error);
  }
};

