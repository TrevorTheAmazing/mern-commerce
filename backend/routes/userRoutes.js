import express from 'express'
const router = express.Router()
import { authenticateUser, registerNewUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.post('/', registerNewUser)
router.post('/login', authenticateUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router