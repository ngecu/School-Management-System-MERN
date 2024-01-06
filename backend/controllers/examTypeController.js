import asyncHandler from 'express-async-handler';
import ExamType from '../models/examTypeModel.js';

// @desc    Create a new exam type
// @route   POST /api/exam-types
// @access  Private
export const createExamType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const examType = await ExamType.create({
    name,
  });

  res.status(201).json(examType);
});

// @desc    Get all exam types
// @route   GET /api/exam-types
// @access  Public
export const getAllExamTypes = asyncHandler(async (req, res) => {
  const examTypes = await ExamType.find();
  res.json(examTypes);
});
