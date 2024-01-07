// timetableController.js

import asyncHandler from 'express-async-handler';
import Timetable from '../models/timetableModel.js';

// @desc    Create a new timetable entry
// @route   POST /api/timetable
// @access  Private
const createTimetableEntry = asyncHandler(async (req, res) => {
  const { course, courseUnit, lecturer, year, dayOfWeek, lecturerRoom, startTime, endTime } = req.body;

  // Check for collisions
  const collisionCheck = await Timetable.find({
    lecturer,
    dayOfWeek,
    lecturerRoom,
    $or: [
      {
        $and: [
          { startTime: { $lte: startTime } },
          { endTime: { $gte: startTime } },
        ],
      },
      {
        $and: [
          { startTime: { $lte: endTime } },
          { endTime: { $gte: endTime } },
        ],
      },
    ],
  });

  if (collisionCheck.length > 0) {
    res.status(400);
    throw new Error('Collision detected: Lecturer is already scheduled at this time and room.');
  }

  const timetableEntry = await Timetable.create({
    course,
    courseUnit,
    lecturer,
    year,
    dayOfWeek,
    lecturerRoom,
    startTime,
    endTime,
  });

  res.status(201).json(timetableEntry);
});

// @desc    Get all timetable entries
// @route   GET /api/timetable
// @access  Public
const getTimetableEntries = asyncHandler(async (req, res) => {
  const timetableEntries = await Timetable.find();
  res.json(timetableEntries);
});

// @desc    Get timetable entries by course
// @route   GET /api/timetable/byCourse/:courseId
// @access  Private (assuming you need authorization)
const getTimetableByCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;


  try {
    // Fetch timetable entries for the specified course
    const timetableEntries = await Timetable.find({ course: courseId }).populate('course').populate('courseUnit').populate('lecturer');

    res.json(timetableEntries);
  } catch (error) {
    res.status(500);
    throw new Error('Failed to fetch timetable entries');
  }
});

// @desc    Delete a timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private
const deleteTimetableEntry = asyncHandler(async (req, res) => {
  const timetableEntry = await Timetable.findById(req.params.id);

  if (!timetableEntry) {
    res.status(404);
    throw new Error('Timetable entry not found');
  }

  await timetableEntry.remove();
  res.json({ message: 'Timetable entry removed' });
});

export { createTimetableEntry, getTimetableEntries, deleteTimetableEntry,getTimetableByCourse };
