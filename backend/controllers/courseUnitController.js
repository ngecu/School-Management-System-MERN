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

  export const getAllCourseUnitsByCourse = asyncHandler(async (req, res) => {
    const courseID = req.params.courseID
    console.log(courseID);
    const courseUnits = await CourseUnit.find({course:courseID});
  
    res.status(200).json({
      success: true,
      data: courseUnits,
    });
  });

  // @desc    Get a single course unit by ID
// @route   GET /api/courseunits/:id
// @access  Public
export const getCourseUnitById = asyncHandler(async (req, res) => {
  const courseUnit = await CourseUnit.findById(req.params.id);

  if (courseUnit) {
    res.json({
      success: true,
      data: courseUnit,
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Course unit not found',
    });
  }
});

// @desc    Update an existing course unit
// @route   PUT /api/courseunits/:id
// @access  Private (if authentication is required)
export const updateCourseUnit = asyncHandler(async (req, res) => {
  const { name, code, description, course } = req.body;

  const courseUnit = await CourseUnit.findById(req.params.id);

  if (courseUnit) {
    courseUnit.name = name;
    courseUnit.code = code;
    courseUnit.description = description;
    courseUnit.course = course;

    const updatedCourseUnit = await courseUnit.save();

    res.json({
      success: true,
      data: updatedCourseUnit,
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Course unit not found',
    });
  }
});

// @desc    Delete a course unit
// @route   DELETE /api/courseunits/:id
// @access  Private (if authentication is required)
export const deleteCourseUnit = asyncHandler(async (req, res) => {
  const courseUnit = await CourseUnit.findById(req.params.id);

  if (courseUnit) {
    await courseUnit.remove();

    res.json({
      success: true,
      data: {},
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Course unit not found',
    });
  }
});
