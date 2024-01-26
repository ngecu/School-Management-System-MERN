import asyncHandler from 'express-async-handler';
import Submission from '../models/assignmentSubmissionModel.js';

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Private
const createSubmission = asyncHandler(async (req, res) => {
  const { student, assignment, fileUrl } = req.body;

  const submission = await Submission.create({ student, assignment, fileUrl });

  res.status(201).json({ success: true, data: submission });
});

const getAllSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Submission.find().populate('student assignment');
  
    res.status(200).json({ success: true, data: submissions });
  });

  // @desc    Get a single submission by ID
// @route   GET /api/submissions/:id
// @access  Private
const getSubmissionById = asyncHandler(async (req, res) => {
    const submission = await Submission.findById(req.params.id).populate('student assignment');
  
    if (submission) {
      res.status(200).json({ success: true, data: submission });
    } else {
      res.status(404);
      throw new Error('Submission not found');
    }
  });

  const updateSubmission = asyncHandler(async (req, res) => {
    const { student, assignment, fileUrl } = req.body;
  
    const submission = await Submission.findById(req.params.id);
  
    if (submission) {
      submission.student = student;
      submission.assignment = assignment;
      submission.fileUrl = fileUrl;
  
      const updatedSubmission = await submission.save();
  
      res.status(200).json({ success: true, data: updatedSubmission });
    } else {
      res.status(404);
      throw new Error('Submission not found');
    }
  });
  

  const deleteSubmission = asyncHandler(async (req, res) => {
    const submission = await Submission.findById(req.params.id);
  
    if (submission) {
      await submission.remove();
      res.status(200).json({ success: true, message: 'Submission removed' });
    } else {
      res.status(404);
      throw new Error('Submission not found');
    }
  })

export { createSubmission,getAllSubmissions,getSubmissionById,updateSubmission,deleteSubmission };
