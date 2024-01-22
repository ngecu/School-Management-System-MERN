import asyncHandler from 'express-async-handler';
import CourseUnit from '../models/courseUnitModel.js';

// @desc    Create a new course unit
// @route   POST /api/courseunits
// @access  Private (if authentication is required)
export const createCourseUnit = asyncHandler(async (req, res) => {
  const { name, code, description,course } = req.body;

  const courseUnit = await CourseUnit.create({
    name,
    code,
    description,
    course
  });

  res.status(201).json({
    success: true,
    data: courseUnit,
  });
});

// @desc    Get all course units
// @route   GET /api/courseunits
// @access  Public
export const getAllCourseUnits = asyncHandler(async (req, res) => {
    const courseUnits = await CourseUnit.find();
  
    res.status(200).json({
      success: true,
      data: courseUnits,
    });
  });

  export const getAllCourseByCourse = asyncHandler(async (req, res) => {
    const courseID = req.params.courseID
    const courseUnits = await CourseUnit.find({course:courseID});
  
    res.status(200).json({
      success: true,
      data: courseUnits,
    });
  });