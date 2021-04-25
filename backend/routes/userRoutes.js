import express from 'express'
const router = express.Router()
import { authenticateUser, registerNewUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerNewUser).get(protect, admin, getUsers)
router.post('/login', authenticateUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router