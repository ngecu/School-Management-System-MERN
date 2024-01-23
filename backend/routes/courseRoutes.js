import express from 'express'
const course_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourse, getAllCourseBySchool, getAllCourses } from '../controllers/courseController.js'

course_router.route('/').post(createCourse)
course_router.route('/').get(getAllCourses)
course_router.route('/school/:schoolID').get(getAllCourseBySchool)

export default course_router
