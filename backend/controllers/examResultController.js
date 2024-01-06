import asyncHandler from 'express-async-handler';
import ExamResult from '../models/examResultModel.js';

// @desc    Create a new exam result
// @route   POST /api/exam-results
// @access  Private
export const createExamResult = asyncHandler(async (req, res) => {
  const { student, exam, marks } = req.body;

  const examResult = await ExamResult.create({
    student,
    exam,
    marks,
  });

  res.status(201).json(examResult);
});

// @desc    Get all exam results
// @route   GET /api/exam-results
// @access  Public
export const getAllExamResults = asyncHandler(async (req, res) => {
  const examResults = await ExamResult.find().populate('student exam');
  res.json(examResults);
});
