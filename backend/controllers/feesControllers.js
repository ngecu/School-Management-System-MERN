import asyncHandler from 'express-async-handler';
import SchoolFees from '../models/schoolFeesModel.js';

// @desc    Create school fees
// @route   POST /api/school-fees
// @access  Private (only accessible by authenticated users)
export const createSchoolFees = asyncHandler(async (req, res) => {
  const { studentId, amount, dueDate } = req.body;

  const schoolFees = await SchoolFees.create({
    student: studentId,
    amount,
    dueDate,
  });

  res.status(201).json(schoolFees);
});

// @desc    Get all school fees
// @route   GET /api/school-fees
// @access  Private
export const getAllSchoolFees = asyncHandler(async (req, res) => {
  const schoolFees = await SchoolFees.find().populate('student');

  res.json(schoolFees);
});

// @desc    Get school fees by student ID
// @route   GET /api/school-fees/:id
// @access  Private
export const getSchoolFeesByStudentId = asyncHandler(async (req, res) => {
  const student = req.params.id;
  console.log(student);
  const schoolFees = await SchoolFees.findOne({student });
  console.log(schoolFees);
  res.json(schoolFees);
});

// @desc    Update school fees status (e.g., paid)
// @route   PUT /api/school-fees/:id/pay
// @access  Private
export const markSchoolFeesAsPaid = asyncHandler(async (req, res) => {
  const schoolFees = await SchoolFees.findById(req.params.id);

  if (schoolFees) {
    schoolFees.isPaid = true;
    schoolFees.paidAt = new Date();
    await schoolFees.save();
    res.json({ message: 'School fees marked as paid' });
  } else {
    res.status(404);
    throw new Error('School fees not found');
  }
});
