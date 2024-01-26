import express from 'express';
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for assignments
router.route('/').post(protect, createAssignment).get(protect, getAllAssignments);
router
  .route('/:id')
  .get(protect, getAssignmentById)
  .put(protect, updateAssignment)
  .delete(protect, deleteAssignment);

export default router;
