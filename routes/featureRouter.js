import express from 'express';
import { createFeature, deleteFeature, getFeature, updateFeature } from '../controllers/featureController.js';
import { authenticateUser } from '../middleware/AuthenticationMiddleware.js';

const router = express.Router();

router.use(authenticateUser)

router.route('/').post(createFeature).get(getFeature);
router.route('/:id').patch(updateFeature).delete(deleteFeature);

export default router;