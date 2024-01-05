import express from 'express'
const course_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourse, getAllCourses } from '../controllers/courseController.js'

course_router.route('/').post(protect, admin,createCourse)
course_router.route('/').get(protect, admin,getAllCourses)

export default course_router
