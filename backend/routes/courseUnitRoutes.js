import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourseUnit, deleteCourseUnit, getAllCourseUnits, getAllCourseUnitsByCourse, getCourseUnitById, updateCourseUnit } from '../controllers/courseUnitController.js'

router.route('/').post(createCourseUnit)
router.route('/').get(getAllCourseUnits)
router.route('/course/:courseID').get(getAllCourseUnitsByCourse)
router.route('/course/:courseID').get(getAllCourseUnitsByCourse)
router.route('/:id').get(getCourseUnitById)
router.route('/:id').put(updateCourseUnit)
router.route('/:id').delete(deleteCourseUnit)

export default router
