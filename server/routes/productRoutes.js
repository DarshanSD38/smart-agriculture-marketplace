import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyFarmerProducts,
  uploadProductImage
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/farmer/my', protect, authorize('farmer', 'admin'), getMyFarmerProducts);
router.get('/:id', getProductById);

router.post('/', protect, authorize('farmer', 'admin'), createProduct);
router.put('/:id', protect, authorize('farmer', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('farmer', 'admin'), deleteProduct);

router.post('/upload', protect, upload.single('image'), uploadProductImage);

export default router;

