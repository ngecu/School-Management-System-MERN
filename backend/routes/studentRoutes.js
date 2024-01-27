import express from 'express'
const student_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { admitStudent, deleteStudent, getAllStudents, studentsByCourse } from '../controllers/studentController.js'

student_router.route('/').post(protect, admin,admitStudent)
student_router.route('/').get(protect,getAllStudents)
student_router.route('/').delete(protect,deleteStudent)
student_router.route('/course/:id').get(protect,studentsByCourse)

export default student_router
