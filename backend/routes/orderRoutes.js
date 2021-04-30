import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderPaidStatus, getMyOrders, getOrders, updateOrderDeliveredStatus } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderPaidStatus)
router.route('/:id/deliver').put(protect, admin, updateOrderDeliveredStatus)

export default router