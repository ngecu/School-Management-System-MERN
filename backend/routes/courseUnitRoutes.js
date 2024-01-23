import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourseUnit, getAllCourseByCourse, getAllCourseUnits } from '../controllers/courseUnitController.js'

router.route('/').post(createCourseUnit)
router.route('/').get(getAllCourseUnits)
router.route('/:courseID').get(getAllCourseByCourse)

export default router
