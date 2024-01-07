// timetableControllers.js

import asyncHandler from 'express-async-handler';
import Timetable from '../models/timetableModel.js';

// @desc    Create timetable entry
// @route   POST /api/timetable
// @access  Private (only accessible by authenticated users, adjust as needed)
export const createTimetableEntry = asyncHandler(async (req, res) => {
  const {
    course,
    courseUnit,
    lecturer,
    dayOfWeek,
    lecturerRoom,
    startTime,
    endTime,
    year
  } = req.body;

  const timetableEntry = await Timetable.create({
    course,
    courseUnit,
    lecturer,
    dayOfWeek,
    lecturerRoom,
    startTime,
    endTime,
    year
  });

  res.status(201).json(timetableEntry);
});

// @desc    Get all timetable entries
// @route   GET /api/timetable
// @access  Public (modify as needed)
export const getAllTimetableEntries = asyncHandler(async (req, res) => {
  const timetableEntries = await Timetable.find().populate('course').populate('courseUnit').populate('lecturer');

  res.json(timetableEntries);
});

// @desc    Get timetable entries by course ID
// @route   GET /api/timetable/course/:id
// @access  Public (modify as needed)
export const getTimetableEntriesByCourseId = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const timetableEntries = await Timetable.find({ course: courseId }).populate('course').populate('courseUnit').populate('lecturer');

  res.json(timetableEntries);
});

// Add more controllers as needed...
