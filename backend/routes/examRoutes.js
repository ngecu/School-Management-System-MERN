import express from 'express'
import { createExam, deleteExam, getAllExams, getExamByCourse, getExamById, updateExam } from '../controllers/examController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createExam)
router.route('/').get(protect, getAllExams)
router.route('/:id').get(protect, getExamById)
router.route('/:id').put(protect, updateExam)
router.route('/:id').delete(protect, deleteExam)

router.route('/course').get(getExamByCourse)

export default router
