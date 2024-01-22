import express from 'express'
import { createExam, getAllExams, getExamByCourse } from '../controllers/examController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createExam)
router.route('/').get(protect, getAllExams)
router.route('/course').get(getExamByCourse)

export default router
