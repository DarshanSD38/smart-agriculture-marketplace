import LabourJob from '../models/LabourJob.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Get all agricultural labourers with search/filters
// @route   GET /api/labour/labourers
// @access  Public
export const getLabourers = async (req, res, next) => {
  try {
    const { skill, location, availability } = req.query;

    let query = { role: 'labour', status: 'Active' };

    if (skill && skill !== 'All') {
      query.skills = new RegExp(skill, 'i');
    }

    if (location && location !== 'All') {
      query.location = new RegExp(location, 'i');
    }

    if (availability && availability !== 'All') {
      query.availability = availability;
    }

    const labourers = await User.find(query).select('-password');

    const formatted = labourers.map(l => ({
      ...l.toObject(),
      id: l._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      labourers: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single labourer profile
// @route   GET /api/labour/labourers/:id
// @access  Public
export const getLabourerById = async (req, res, next) => {
  try {
    const labourer = await User.findOne({ _id: req.params.id, role: 'labour' }).select('-password');

    if (!labourer) {
      return res.status(404).json({
        success: false,
        message: 'Labourer profile not found'
      });
    }

    res.json({
      success: true,
      labourer: {
        ...labourer.toObject(),
        id: labourer._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new field job posting
// @route   POST /api/labour/jobs
// @access  Private (Farmer, Admin)
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      location,
      requiredSkill,
      workersNeeded,
      startDate,
      duration,
      dailyPayment,
      perks,
      description
    } = req.body;

    const job = await LabourJob.create({
      farmer: req.user._id,
      farmerName: req.user.name,
      title,
      location: location || req.user.location,
      requiredSkill,
      workersNeeded: Number(workersNeeded) || 1,
      startDate: startDate || new Date().toISOString().split('T')[0],
      duration: duration || '3 Days',
      dailyPayment: Number(dailyPayment),
      perks: perks || 'Lunch & Refreshments provided',
      description
    });

    res.status(201).json({
      success: true,
      message: 'Field labour job created successfully',
      job: {
        ...job.toObject(),
        id: job._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all available field jobs
// @route   GET /api/labour/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const { skill, location, status } = req.query;

    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (skill && skill !== 'All') {
      query.requiredSkill = new RegExp(skill, 'i');
    }

    if (location && location !== 'All') {
      query.location = new RegExp(location, 'i');
    }

    const jobs = await LabourJob.find(query).sort({ createdAt: -1 });

    const formatted = jobs.map(j => ({
      ...j.toObject(),
      id: j._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      jobs: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Labourer applies for a job
// @route   POST /api/labour/jobs/:id/apply
// @access  Private (Labour)
export const applyForJob = async (req, res, next) => {
  try {
    const job = await LabourJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job posting not found'
      });
    }

    // Check if already applied
    const existing = await Application.findOne({
      job: job._id,
      labourer: req.user._id
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    const application = await Application.create({
      job: job._id,
      labourer: req.user._id,
      farmer: job.farmer,
      jobTitle: job.title,
      farmerName: job.farmerName,
      labourerName: req.user.name,
      labourerPhone: req.user.phone,
      labourerSkills: req.user.skills || [job.requiredSkill],
      dailyWage: req.user.dailyWage || job.dailyPayment,
      status: 'Pending'
    });

    // Increment applicants counter on job
    job.workersApplied = (job.workersApplied || 0) + 1;
    await job.save();

    // Notify farmer
    await Notification.create({
      recipient: job.farmer,
      roleTarget: 'farmer',
      type: 'job_alert',
      title: 'New Labourer Application!',
      message: `${req.user.name} applied for "${job.title}".`,
      link: '/farmer/find-labour'
    });

    res.status(201).json({
      success: true,
      message: 'Job application submitted successfully',
      application: {
        ...application.toObject(),
        id: application._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current labourer's submitted applications
// @route   GET /api/labour/applications/my
// @access  Private (Labour)
export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ labourer: req.user._id }).sort({ createdAt: -1 });

    const formatted = applications.map(a => ({
      ...a.toObject(),
      id: a._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      applications: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Farmer views all applications for their jobs
// @route   GET /api/labour/applications/farmer
// @access  Private (Farmer)
export const getFarmerApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ farmer: req.user._id }).sort({ createdAt: -1 });

    const formatted = applications.map(a => ({
      ...a.toObject(),
      id: a._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      applications: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Farmer accepts or rejects application
// @route   PUT /api/labour/applications/:id/status
// @access  Private (Farmer, Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be Accepted or Rejected'
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    await application.save();

    // Notify labourer
    await Notification.create({
      recipient: application.labourer,
      roleTarget: 'labour',
      type: 'job_alert',
      title: `Job Application ${status}`,
      message: `Farmer ${application.farmerName} ${status.toLowerCase()} your application for "${application.jobTitle}".`,
      link: '/labour/applications'
    });

    res.json({
      success: true,
      message: `Application marked as ${status}`,
      application: {
        ...application.toObject(),
        id: application._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

