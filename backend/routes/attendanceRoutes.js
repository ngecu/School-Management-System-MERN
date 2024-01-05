import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addAccountant, getAllAccountants } from '../controllers/accountantController.js'
import { addAttendance, getAllAttendance } from '../controllers/attendanceController.js'

router.route('/').post(protect, admin,addAttendance)
router.route('/').get(protect, admin,getAllAttendance)


export default router
