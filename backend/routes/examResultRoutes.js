import express from 'express'
import { createExamResult, deleteExamResult, getAllExamResults, getExamResultById, getExamResultByStudents, updateExamResult } from '../controllers/examResultController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllExamResults)
router.route('/:id').get(protect, getExamResultById)
router.route('/student').post(protect, getExamResultByStudents)
router.route('/:id').put(protect, updateExamResult)
router.route('/:id').delete(protect, deleteExamResult)
router.route('/').post(protect, createExamResult)

export default router
