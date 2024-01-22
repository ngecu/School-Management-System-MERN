import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourseUnit, getAllCourseUnits } from '../controllers/courseUnitController.js'

router.route('/').post(createCourseUnit)
router.route('/').get(getAllCourseUnits)
router.route('/:courseID').get(getAllCourseUnits)

export default router
