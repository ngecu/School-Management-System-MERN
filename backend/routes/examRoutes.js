// routes/examRoutes.js
import express from 'express';
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  registerForExam,
  checkExamEligibility,
  getAvailableExams,
  getMyExamResults
} from '../controllers/examController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createExam)
  .get(getAllExams);

router.route('/available')
  .get(protect, getAvailableExams);

router.route('/check-eligibility')
  .get(protect, checkExamEligibility);

router.route('/my-results')
  .get(protect, getMyExamResults);

router.route('/:examId/register')
  .post(protect, registerForExam);

router.route('/:id')
  .get(getExamById)
  .put(protect, updateExam)
  .delete(protect, deleteExam);

export default router;