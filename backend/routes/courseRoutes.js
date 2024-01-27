import express from 'express'
const course_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourse, deleteCourse, getAllCourseBySchool, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js'

course_router.route('/').post(createCourse)
course_router.route('/').get(getAllCourses)
course_router.route('/school/:schoolID').get(getAllCourseBySchool)
course_router.route('/:id').get(getCourseById)
course_router.route('/:id').put(updateCourse)
course_router.route('/:id').delete(deleteCourse)

export default course_router
