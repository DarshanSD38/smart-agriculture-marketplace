import express from 'express';
import { analyzeCropImage, getMyCropReports } from '../controllers/cropHealthController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/analyze', protect, authorize('farmer', 'admin'), upload.single('image'), analyzeCropImage);
router.get('/reports', protect, authorize('farmer', 'admin'), getMyCropReports);

export default router;

