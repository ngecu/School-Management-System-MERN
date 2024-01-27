import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addAccountant, getAllAccountants } from '../controllers/accountantController.js'
import { addAttendance, getAllAttendance, getAttendanceByCourseId, getAttendanceByStudentId } from '../controllers/attendanceController.js'

router.route('/').post(protect,addAttendance)
router.route('/').get(protect, admin,getAllAttendance)
router.route('/student/:id').get(protect, admin,getAttendanceByStudentId)
router.route('/course/:id').get(protect, admin,getAttendanceByCourseId)


export default router
