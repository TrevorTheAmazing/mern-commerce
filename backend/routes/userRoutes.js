import express from 'express'
const router = express.Router()
import { authenticateUser, registerNewUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'


router.post('/', registerNewUser)
router.post('/login', authenticateUser)
router.route('/profile').get(protect, getUserProfile)

export default router