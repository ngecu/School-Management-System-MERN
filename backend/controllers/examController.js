import asyncHandler from 'express-async-handler';
import Exam from '../models/examModel.js';
import ExamResult from '../models/examResultModel.js';
import SchoolFees from '../models/schoolFeesModel.js';
import Student from '../models/studentModel.js';

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

// @desc    Register student for an exam
// @route   POST /api/exams/:examId/register
// @access  Private (Student)
export const registerForExam = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const userId = req.user._id;

  // Find the user
  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Only students can register for exams
  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can register for exams');
  }

  // Find the student
  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Check if the exam exists
  const exam = await Exam.findById(examId);
  
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  // Check school fees payment status
  const schoolFees = await SchoolFees.find({ student: student._id });
  
  if (schoolFees.length === 0) {
    res.status(403);
    throw new Error('You have no school fees record. Please contact the administration.');
  }

  let totalFees = 0;
  let paidAmount = 0;
  let hasPendingFees = false;

  schoolFees.forEach(fee => {
    totalFees += fee.amount;
    if (fee.status === 'Paid') {
      paidAmount += fee.amount;
    } else if (fee.status === 'Pending') {
      hasPendingFees = true;
    }
  });

  // Check if at least 50% is paid
  const fiftyPercent = totalFees * 0.5;

  if (paidAmount < fiftyPercent) {
    res.status(403);
    throw new Error(`Cannot register for exams: You have only paid ${paidAmount} out of ${totalFees}. You need to pay at least 50% (${fiftyPercent}) of your school fees.`);
  }

  // Check if there are any pending fees (unpaid)
  if (hasPendingFees) {
    const pendingAmount = totalFees - paidAmount;
    res.status(403);
    throw new Error(`Cannot register for exams: You have pending fees of ${pendingAmount}. Please clear all pending fees to register.`);
  }

  // Check if student is already registered for this exam
  const existingResult = await ExamResult.findOne({ 
    student: student._id, 
    exam: examId 
  });

  if (existingResult) {
    res.status(400);
    throw new Error('You are already registered for this exam');
  }

  // Register the student for the exam
  const examResult = await ExamResult.create({
    student: student._id,
    exam: examId,
    marksObtained: 0,
    registered: true,
    registrationDate: new Date()
  });

  res.status(201).json({
    success: true,
    message: 'Successfully registered for exam',
    data: examResult
  });
});

// @desc    Check if student can register for exams
// @route   GET /api/exams/check-registration-eligibility
// @access  Private (Student)
export const checkExamEligibility = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can check exam eligibility');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const schoolFees = await SchoolFees.find({ student: student._id });
  
  if (schoolFees.length === 0) {
    return res.json({
      eligible: false,
      reason: 'No school fees record found. Please contact the administration.',
      totalFees: 0,
      paidAmount: 0,
      pendingAmount: 0
    });
  }

  let totalFees = 0;
  let paidAmount = 0;
  let hasPendingFees = false;

  schoolFees.forEach(fee => {
    totalFees += fee.amount;
    if (fee.status === 'Paid') {
      paidAmount += fee.amount;
    } else if (fee.status === 'Pending') {
      hasPendingFees = true;
    }
  });

  const fiftyPercent = totalFees * 0.5;
  const pendingAmount = totalFees - paidAmount;

  let eligible = true;
  let reason = '';

  if (paidAmount < fiftyPercent) {
    eligible = false;
    reason = `You need to pay at least 50% (${fiftyPercent}) of your school fees. Currently paid: ${paidAmount}`;
  } else if (hasPendingFees) {
    eligible = false;
    reason = `You have pending fees of ${pendingAmount}. Please clear all pending fees to register for exams.`;
  }

  res.json({
    eligible,
    reason,
    totalFees,
    paidAmount,
    pendingAmount,
    fiftyPercentRequired: fiftyPercent
  });
});

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
export const getAllExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find().populate('examType courseUnit');
  res.json(exams);
});

// @desc    Get exams available for registration (student)
// @route   GET /api/exams/available
// @access  Private (Student)
export const getAvailableExams = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can view available exams');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Check eligibility first
  const schoolFees = await SchoolFees.find({ student: student._id });
  
  let totalFees = 0;
  let paidAmount = 0;
  let hasPendingFees = false;

  schoolFees.forEach(fee => {
    totalFees += fee.amount;
    if (fee.status === 'Paid') {
      paidAmount += fee.amount;
    } else if (fee.status === 'Pending') {
      hasPendingFees = true;
    }
  });

  const fiftyPercent = totalFees * 0.5;

  // Check if student can view exams (not necessarily register)
  let canViewExams = true;
  let registrationEligible = true;
  let message = '';

  if (paidAmount < fiftyPercent) {
    registrationEligible = false;
    message = `Cannot register: Need to pay 50% (${fiftyPercent}) of fees. Paid: ${paidAmount}`;
  } else if (hasPendingFees) {
    registrationEligible = false;
    message = `Cannot register: Has pending fees of ${totalFees - paidAmount}`;
  }

  // Get exams with registration status
  const exams = await Exam.find().populate('examType courseUnit');
  
  // Check which exams the student is already registered for
  const examResults = await ExamResult.find({ student: student._id });
  const registeredExamIds = examResults.map(result => result.exam.toString());

  const examsWithStatus = exams.map(exam => ({
    ...exam.toObject(),
    registered: registeredExamIds.includes(exam._id.toString()),
    eligibleForRegistration: registrationEligible
  }));

  res.json({
    exams: examsWithStatus,
    eligibility: {
      canRegister: registrationEligible,
      message,
      totalFees,
      paidAmount,
      pendingAmount: totalFees - paidAmount,
      fiftyPercentRequired: fiftyPercent
    }
  });
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

// @desc    Get exam results for a student
// @route   GET /api/exams/my-results
// @access  Private (Student)
export const getMyExamResults = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can view exam results');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const examResults = await ExamResult.find({ student: student._id })
    .populate({
      path: 'exam',
      populate: {
        path: 'examType courseUnit'
      }
    });

  res.json(examResults);
});