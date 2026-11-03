import express from 'express';
import {
  getPriceRecommendation,
  getDemandPrediction,
  getSurplusAnalysis,
  getCropRecommendation,
  getRecommendations
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/price-recommendation', getPriceRecommendation);
router.get('/demand-prediction', getDemandPrediction);
router.get('/surplus-analysis', getSurplusAnalysis);
router.post('/crop-recommendation', getCropRecommendation);
router.get('/recommendations', getRecommendations);

export default router;
