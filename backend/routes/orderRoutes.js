import express from 'express';
import { addOrderItems, getOrderById, updateOrderToPaid } from '../controllers/orderController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
 