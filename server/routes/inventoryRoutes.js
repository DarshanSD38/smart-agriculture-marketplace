import express from 'express';
import { getFarmerInventory, updateStock } from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('farmer', 'admin'), getFarmerInventory);
router.put('/:id', protect, authorize('farmer', 'admin'), updateStock);

export default router;

