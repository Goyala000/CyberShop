import express from 'express';
import { 
    authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile 
} from '../controllers/userController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router.route('/').post(registerUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
 