import express from 'express';
const router = express.Router();
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
} from '../controllers/assignmentSubmissionControllers.js';
import { protect } from '../middleware/authMiddleware.js';

// Routes for /api/submissions

// Create a new submission
router.route('/').post(protect, createSubmission);

// Get all submissions
router.route('/').get(protect, getAllSubmissions);

// Get a single submission by ID
router.route('/:id').get(protect, getSubmissionById);

// Update a submission
router.route('/:id').put(protect, updateSubmission);

// Delete a submission
router.route('/:id').delete(protect, deleteSubmission);

export default router;
