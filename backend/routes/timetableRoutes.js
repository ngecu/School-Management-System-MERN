// routes/timetableRoutes.js

import express from 'express';
import {
  createTimetableEntry,
  getTimetableEntries,
  deleteTimetableEntry,
  getTimetableByCourse,
} from '../controllers/timetableControllers.js';

const router = express.Router();

// @desc    Create a new timetable entry
// @route   POST /api/timetable
// @access  Private
router.route('/').post(createTimetableEntry);

// @desc    Get all timetable entries
// @route   GET /api/timetable
// @access  Public
router.route('/').get(getTimetableEntries);
// @desc    Delete a timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private
router.route('/:id').delete(deleteTimetableEntry);


router.route('/byCourse/:courseId').get(getTimetableByCourse);


export default router;
