import asyncHandler from 'express-async-handler';
import Exam from '../models/examModel.js';

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private
export const createExam = asyncHandler(async (req, res) => {
  const { title, date, examType, courseUnit, startTime } = req.body;

  // Check if an exam with the same date and start time exists
  const existingExam = await Exam.findOne({ date, startTime });

  if (existingExam) {
    res.status(400).json({ message: 'An exam with the same date and start time already exists.' });
  } else {
    // Create the new exam
    const exam = await Exam.create({
      title,
      date,
      examType,
      courseUnit,
      startTime,
    });

    res.status(201).json(exam);
  }
});


// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
export const getAllExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find().populate('examType courseUnit');
  res.json(exams);
});
