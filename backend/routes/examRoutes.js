import express from 'express'
import { createExam, getAllExams } from '../controllers/examController.js'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin,createExam)
router.route('/').get(protect, admin,getAllExams)

export default router
