import express from 'express';
import {
  getLabourers,
  getLabourerById,
  createJob,
  getJobs,
  applyForJob,
  getMyApplications,
  getFarmerApplications,
  updateApplicationStatus
} from '../controllers/labourController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Labourers directory
router.get('/labourers', getLabourers);
router.get('/labourers/:id', getLabourerById);

// Field Jobs
router.get('/jobs', getJobs);
router.post('/jobs', protect, authorize('farmer', 'admin'), createJob);
router.post('/jobs/:id/apply', protect, authorize('labour'), applyForJob);

// Applications
router.get('/applications/my', protect, authorize('labour'), getMyApplications);
router.get('/applications/farmer', protect, authorize('farmer', 'admin'), getFarmerApplications);
router.put('/applications/:id/status', protect, authorize('farmer', 'admin'), updateApplicationStatus);

export default router;

