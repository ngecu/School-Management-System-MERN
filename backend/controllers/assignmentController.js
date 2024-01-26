import Assignment from '../models/assignmentModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private (Only accessible by authenticated users)
export const createAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate, course, yearOfStudy } = req.body;

  // Assuming that createdBy should be the logged-in user (you may need to adjust this based on your authentication setup)
  const createdBy = req.user._id;

  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    course,
    yearOfStudy,
    createdBy,
  });

  res.status(201).json({ success: true, data: assignment });
});

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private (Only accessible by authenticated users)
export const getAllAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find().populate('course').populate('createdBy');
  res.status(200).json({ success: true, data: assignments });
});

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Private (Only accessible by authenticated users)
export const getAssignmentById = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id).populate('course').populate('createdBy');

  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }

  res.status(200).json({ success: true, data: assignment });
});

// @desc    Update assignment by ID
// @route   PUT /api/assignments/:id
// @access  Private (Only accessible by authenticated users)
export const updateAssignment = asyncHandler(async (req, res) => {
  const { title, description, dueDate, course, yearOfStudy } = req.body;

  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }

  // Assuming that createdBy should remain the same (you may need to adjust this based on your requirements)
  assignment.title = title;
  assignment.description = description;
  assignment.dueDate = dueDate;
  assignment.course = course;
  assignment.yearOfStudy = yearOfStudy;

  const updatedAssignment = await assignment.save();

  res.status(200).json({ success: true, data: updatedAssignment });
});

// @desc    Delete assignment by ID
// @route   DELETE /api/assignments/:id
// @access  Private (Only accessible by authenticated users)
export const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    res.status(404);
    throw new Error('Assignment not found');
  }

  await assignment.remove();

  res.status(200).json({ success: true, message: 'Assignment deleted' });
});
