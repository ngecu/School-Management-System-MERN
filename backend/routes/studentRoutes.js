import express from 'express'
const student_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { admitStudent } from '../controllers/studentController.js'

student_router.route('/').post(protect, admin,admitStudent)

export default student_router
