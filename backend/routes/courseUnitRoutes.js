import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createCourseUnit, getAllCourseUnits } from '../controllers/courseUnitController.js'

router.route('/').post(protect, admin,createCourseUnit)
router.route('/').get(protect, admin,getAllCourseUnits)

export default router
