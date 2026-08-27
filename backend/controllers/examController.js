import asyncHandler from 'express-async-handler';
import Exam from '../models/examModel.js';
import ExamResult from '../models/examResultModel.js';
import ExamBooking from '../models/examBookingModel.js';
import SchoolFees from '../models/schoolFeesModel.js';
import Student from '../models/studentModel.js';
import User from '../models/userModel.js';
import QRCode from 'qrcode';

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private
export const createExam = asyncHandler(async (req, res) => {
  const { title, date, examType, courseUnit, startTime, venue, duration } = req.body;

  const existingExam = await Exam.findOne({ date, startTime });

  if (existingExam) {
    res.status(400).json({ message: 'An exam with the same date and start time already exists.' });
  } else {
    const exam = await Exam.create({
      title,
      date,
      examType,
      courseUnit,
      startTime,
      venue,
      duration
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

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can register for exams');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const exam = await Exam.findById(examId);
  
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

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

  const fiftyPercent = totalFees * 0.5;

  if (paidAmount < fiftyPercent) {
    res.status(403);
    throw new Error(`Cannot register for exams: You have only paid ${paidAmount} out of ${totalFees}. You need to pay at least 50% (${fiftyPercent}) of your school fees.`);
  }

  if (hasPendingFees) {
    const pendingAmount = totalFees - paidAmount;
    res.status(403);
    throw new Error(`Cannot register for exams: You have pending fees of ${pendingAmount}. Please clear all pending fees to register.`);
  }

  const existingResult = await ExamResult.findOne({ 
    student: student._id, 
    exam: examId 
  });

  if (existingResult) {
    res.status(400);
    throw new Error('You are already registered for this exam');
  }

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

  let registrationEligible = true;
  let message = '';

  if (paidAmount < fiftyPercent) {
    registrationEligible = false;
    message = `Cannot register: Need to pay 50% (${fiftyPercent}) of fees. Paid: ${paidAmount}`;
  } else if (hasPendingFees) {
    registrationEligible = false;
    message = `Cannot register: Has pending fees of ${totalFees - paidAmount}`;
  }

  const exams = await Exam.find().populate('examType courseUnit');
  
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
  const { title, date, examType, courseUnit, startTime, venue, duration } = req.body;

  const exam = await Exam.findById(req.params.id);

  if (exam) {
    const existingExam = await Exam.findOne({ date, startTime, _id: { $ne: req.params.id } });

    if (existingExam) {
      res.status(400).json({ message: 'An exam with the same date and start time already exists.' });
    } else {
      exam.title = title || exam.title;
      exam.date = date || exam.date;
      exam.examType = examType || exam.examType;
      exam.courseUnit = courseUnit || exam.courseUnit;
      exam.startTime = startTime || exam.startTime;
      exam.venue = venue || exam.venue;
      exam.duration = duration || exam.duration;

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

// @desc    Book an exam (requires full fee payment)
// @route   POST /api/exams/:examId/book
// @access  Private (Student)
export const bookExam = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can book exams');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const exam = await Exam.findById(examId).populate('examType courseUnit');
  
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  if (exam.status === 'Closed' || new Date(exam.date) < new Date()) {
    res.status(400);
    throw new Error('This exam is no longer available for booking');
  }

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

  if (paidAmount < totalFees) {
    const remainingAmount = totalFees - paidAmount;
    res.status(403);
    throw new Error(`Cannot book exam: You have pending fees of ${remainingAmount}. Please clear ALL school fees to book exams.`);
  }

  if (hasPendingFees) {
    res.status(403);
    throw new Error('Cannot book exam: You have pending fees. Please clear ALL school fees to book exams.');
  }

  const existingBooking = await ExamBooking.findOne({ 
    student: student._id, 
    exam: examId,
    status: { $in: ['Booked', 'Confirmed'] }
  });

  if (existingBooking) {
    res.status(400);
    throw new Error('You have already booked this exam');
  }

  const existingResult = await ExamResult.findOne({ 
    student: student._id, 
    exam: examId 
  });

  if (existingResult) {
    res.status(400);
    throw new Error('You have already taken this exam');
  }

  const bookingReference = `EXAM-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const examBooking = await ExamBooking.create({
    student: student._id,
    exam: examId,
    bookingReference,
    status: 'Booked',
    bookingDate: new Date(),
    isEligible: true
  });

  const examCardData = {
    bookingReference: examBooking.bookingReference,
    studentName: `${student.firstName} ${student.lastName}`,
    studentId: student.studentId || student._id,
    course: student.course || 'N/A',
    examTitle: exam.title,
    examType: exam.examType ? exam.examType.name : 'N/A',
    examDate: new Date(exam.date).toLocaleDateString(),
    examTime: exam.startTime || '09:00 AM',
    venue: exam.venue || 'Main Hall',
    duration: exam.duration || '3 hours',
    registrationNumber: student.registrationNumber || student._id,
    school: student.school ? student.school.name : 'N/A'
  };

  const qrCodeData = JSON.stringify({
    bookingRef: examBooking.bookingReference,
    studentId: student._id,
    examId: examId
  });
  
  const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

  res.status(201).json({
    success: true,
    message: 'Exam booked successfully!',
    data: {
      booking: examBooking,
      examCard: examCardData,
      qrCode: qrCodeUrl
    }
  });
});

// @desc    Get exam card for a booked exam
// @route   GET /api/exams/:examId/exam-card
// @access  Private (Student)
export const getExamCard = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can view exam cards');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const exam = await Exam.findById(examId).populate('examType courseUnit');
  
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  const booking = await ExamBooking.findOne({ 
    student: student._id, 
    exam: examId,
    status: { $in: ['Booked', 'Confirmed'] }
  });

  if (!booking) {
    res.status(404);
    throw new Error('No booking found for this exam');
  }

  const examCardData = {
    bookingReference: booking.bookingReference,
    studentName: `${student.firstName} ${student.lastName}`,
    studentId: student.studentId || student._id,
    course: student.course || 'N/A',
    examTitle: exam.title,
    examType: exam.examType ? exam.examType.name : 'N/A',
    examDate: new Date(exam.date).toLocaleDateString(),
    examTime: exam.startTime || '09:00 AM',
    venue: exam.venue || 'Main Hall',
    duration: exam.duration || '3 hours',
    registrationNumber: student.registrationNumber || student._id,
    school: student.school ? student.school.name : 'N/A',
    bookingDate: new Date(booking.bookingDate).toLocaleDateString(),
    status: booking.status
  };

  const qrCodeData = JSON.stringify({
    bookingRef: booking.bookingReference,
    studentId: student._id,
    examId: examId
  });
  
  const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

  res.json({
    success: true,
    data: {
      examCard: examCardData,
      qrCode: qrCodeUrl
    }
  });
});

// @desc    Get all booked exams for a student
// @route   GET /api/exams/my-bookings
// @access  Private (Student)
export const getMyExamBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (user.userType !== 'Student') {
    res.status(403);
    throw new Error('Only students can view bookings');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const bookings = await ExamBooking.find({ student: student._id })
    .populate({
      path: 'exam',
      populate: ['examType', 'courseUnit']
    })
    .sort({ bookingDate: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Confirm exam booking (Admin only)
// @route   PUT /api/exams/bookings/:bookingId/confirm
// @access  Private (Admin)
export const confirmExamBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await ExamBooking.findById(bookingId);
  
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.status === 'Confirmed') {
    res.status(400);
    throw new Error('Booking is already confirmed');
  }

  booking.status = 'Confirmed';
  booking.confirmedAt = new Date();
  await booking.save();

  res.json({
    success: true,
    message: 'Booking confirmed successfully',
    data: booking
  });
});

// @desc    Cancel exam booking
// @route   PUT /api/exams/bookings/:bookingId/cancel
// @access  Private (Student)
export const cancelExamBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const student = await Student.findOne({ email: user.email });
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const booking = await ExamBooking.findOne({ 
    _id: bookingId,
    student: student._id
  });
  
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.status === 'Cancelled') {
    res.status(400);
    throw new Error('Booking is already cancelled');
  }

  if (booking.status === 'Confirmed') {
    res.status(400);
    throw new Error('Cannot cancel a confirmed booking. Please contact administration.');
  }

  booking.status = 'Cancelled';
  booking.cancelledAt = new Date();
  await booking.save();

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: booking
  });
});