import express from 'express'
import { createExam, deleteExam, getAllExams, getExamByCourse, getExamById, updateExam } from '../controllers/examController.js'
import { createExamResult, deleteExamResult, getAllExamResults, getExamResultById, updateExamResult } from '../controllers/examResultController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createExamResult)
router.route('/').get(protect, getAllExamResults)
router.route('/:id').get(protect, getExamResultById)
router.route('/:id').put(protect, updateExamResult)
router.route('/:id').delete(protect, deleteExamResult)

export default router
