import asyncHandler from 'express-async-handler';
import ExamResult from '../models/examResultModel.js';

// @desc    Create a new exam result
// @route   POST /api/exam-results
// @access  Private
export const createExamResult = asyncHandler(async (req, res) => {
  const { student, exam, marksObtained } = req.body;

  const examResult = await ExamResult.create({
    student,
    exam,
    marksObtained,
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

// @desc    Get a single exam result by ID
// @route   GET /api/exam-results/:id
// @access  Public
export const getExamResultById = asyncHandler(async (req, res) => {
  const examResult = await ExamResult.findById(req.params.id).populate('student exam');

  if (examResult) {
    res.json(examResult);
  } else {
    res.status(404);
    throw new Error('Exam result not found');
  }
});

// @desc    Get a single exam result by ID
// @route   GET /api/exam-results/:id
// @access  Public
export const getExamResultByStudents = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {students} = req.body;

  try {
    const examResults = [];
    for (const studentId of students) {
      console.log("Student ID: ", studentId);
      const examResult = await ExamResult.find({ student: studentId }).populate('student exam');
      examResults.push(...examResult);
    }

    res.json(examResults);
  } catch (error) {

    res.status(500).json({ message: `Server Error : ${error}` });
  }
});



// @desc    Update an existing exam result
// @route   PUT /api/exam-results/:id
// @access  Private
export const updateExamResult = asyncHandler(async (req, res) => {
  const { student, exam, marks } = req.body;

  const examResult = await ExamResult.findById(req.params.id);

  if (examResult) {
    examResult.student = student;
    examResult.exam = exam;
    examResult.marks = marks;

    const updatedExamResult = await examResult.save();
    res.json(updatedExamResult);
  } else {
    res.status(404);
    throw new Error('Exam result not found');
  }
});

// @desc    Delete an exam result
// @route   DELETE /api/exam-results/:id
// @access  Private
export const deleteExamResult = asyncHandler(async (req, res) => {
  const examResult = await ExamResult.findById(req.params.id);

  if (examResult) {
    await examResult.remove();
    res.json({ message: 'Exam result removed' });
  } else {
    res.status(404);
    throw new Error('Exam result not found');
  }
});
