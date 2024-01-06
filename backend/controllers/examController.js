import asyncHandler from 'express-async-handler';
import Exam from '../models/examModel.js';

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private
export const createExam = asyncHandler(async (req, res) => {
  const { title, date, examType, courseUnit } = req.body;

  const exam = await Exam.create({
    title,
    date,
    examType,
    courseUnit,
  });

  res.status(201).json(exam);
});

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
export const getAllExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find().populate('examType courseUnit');
  res.json(exams);
});
