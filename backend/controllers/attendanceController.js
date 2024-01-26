import asyncHandler from 'express-async-handler';
import Attendance from '../models/attendanceModel.js';

// @desc    Add attendance
// @route   POST /api/attendance
// @access  Private
export const addAttendance = asyncHandler(async (req, res) => {
  const { studentId, courseId, date, signInTime } = req.body;

  const attendance = await Attendance.create({
    student: studentId,
    course: courseId,
    date,
    signInTime,
    // Add more fields if needed.
  });

  if (attendance) {
    res.status(201).json({
      success: true,
      data: attendance,
    });
  } else {
    res.status(400);
    throw new Error('Invalid attendance data');
  }
});

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private
export const getAllAttendance = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find().populate('student').populate('course');

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

// @desc    Get attendance by student ID
// @route   GET /api/attendance/student/:id
// @access  Private
export const getAttendanceByStudentId = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const attendance = await Attendance.find({ student: studentId }).populate('course');

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

// @desc    Get attendance by course ID
// @route   GET /api/attendance/course/:id
// @access  Private
export const getAttendanceByCourseId = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const attendance = await Attendance.find({ course: courseId }).populate('student');

  res.status(200).json({
    success: true,
    data: attendance,
  });
});

