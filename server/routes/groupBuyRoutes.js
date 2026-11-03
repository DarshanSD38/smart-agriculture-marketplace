import express from 'express';
import { getGroupBuys, joinGroupBuy } from '../controllers/groupBuyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getGroupBuys);
router.post('/:id/join', protect, joinGroupBuy);

export default router;

