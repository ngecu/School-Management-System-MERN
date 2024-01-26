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


export const getExamByCourse = asyncHandler(async (req, res) => {
  const exams = await Exam.find().populate('examType courseUnit');
  console.log(exams);
  res.json(exams);
});

// @desc    Get a single exam by ID
// @route   GET /api/exams/:id
// @access  Public
export const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id).populate('examType courseUnit');

  if (exam) {
    res.json(exam);
  } else {
    res.status(404).json({ message: 'Exam not found' });
  }
});

// @desc    Update an existing exam
// @route   PUT /api/exams/:id
// @access  Private
export const updateExam = asyncHandler(async (req, res) => {
  const { title, date, examType, courseUnit, startTime } = req.body;

  const exam = await Exam.findById(req.params.id);

  if (exam) {
    // Check if an exam with the same date and start time already exists
    const existingExam = await Exam.findOne({ date, startTime, _id: { $ne: req.params.id } });

    if (existingExam) {
      res.status(400).json({ message: 'An exam with the same date and start time already exists.' });
    } else {
      // Update the exam details
      exam.title = title;
      exam.date = date;
      exam.examType = examType;
      exam.courseUnit = courseUnit;
      exam.startTime = startTime;

      const updatedExam = await exam.save();
      res.json(updatedExam);
    }
  } else {
    res.status(404).json({ message: 'Exam not found' });
  }
});

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Private
export const deleteExam = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (exam) {
    await exam.remove();
    res.json({ message: 'Exam removed' });
  } else {
    res.status(404).json({ message: 'Exam not found' });
  }
});

// Export the controllers
export {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
};
