import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Parent from '../models/parentModel.js';
import {v4} from 'uuid'
import User from '../models/userModel.js';
import SchoolFees from '../models/schoolFeesModel.js';
import Course from '../models/courseModel.js';

import { v4 as uuidv4 } from 'uuid';

export const admitStudent = asyncHandler(async (req, res) => {
  try {
    const password = "studentPassword123";
    const {
      email,
      firstName,
      lastName,
      gender,
      dob,
      religion,
      phone,
      nationalID,
      course,
      parentFullName,
      relationship,
      parentPhone,
      parentEmail,
      status,
      lastLoginDate,
      lastLoginIp,
      year_of_study,
      mos
    } = req.body;

    // Check if the student already exists
    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      res.status(400);
      throw new Error('Student already exists');
    }

    // Create an array to store parent IDs
    const parentIds = [];

    // Iterate through parents array and create/update parent documents

    // Check if the parent already exists
    let parent = await Parent.findOne({ parentEmail });

    // If not, create a new parent
    if (!parent) {
      parent = await Parent.create({
        email: parentEmail,
        fullName: parentFullName,
        phone: parentPhone,
        password: password
      });
    }

    // Add the parent's ID to the array
    parentIds.push(parent._id);

    // Find the course by name
    const courseExtracted = await Course.findOne({ _id: course });
    if (!course) {
      res.status(400);
      throw new Error('Course not found');
    }

    // Generate admission number
    const courseCode = courseExtracted.name.substring(0, 3).toUpperCase(); 
    const courseIndex = await Student.countDocuments({ course }) + 1; // Count existing students in the same course and increment by 1
    const currentYear = new Date().getFullYear();
    const admissionNumber = `${courseCode}/${courseIndex}/${currentYear}/${year_of_study}`;


    const student = await Student.create({
      email,
      password,
      firstName,
      lastName,
      gender,
      dob,
      religion,
      phone,
      nationalID,
      course,
      parents: parentIds,
      status,
      lastLoginDate,
      lastLoginIp,
      password,
      year_of_study,
      mos,
      admissionNumber 
    });

    if (student) {
      // Update parent documents to include the student ID
      await Parent.updateMany({ _id: { $in: parentIds } }, { $push: { students: student._id } });

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }

      const user = await User.create({
        firstName,
        secondName: lastName, // Assuming you have a variable named secondName
        email,
        password,
        userType: "Student",
        // Add other relevant fields based on your User schema
      });

      if (user) {

        const studentId = student._id;

        // Check if school fees already exist for the student
        const today = new Date();

// Calculate 3 months from today's date
const dueDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

        const existingFees = await SchoolFees.findOne({ student: studentId });

        if (!existingFees) {
          // If school fees don't exist, create them
          await SchoolFees.create({
            student: studentId,
            amount: 30000,
            dueDate,
            transactionId: uuidv4()
          });

        }

        res.status(200).json({
          admissionNumber,
          message: "Student registered successfully",
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }

    } else {
      res.status(400);
      throw new Error('Invalid student data');
    }
  } catch (error) {
    console.log(error);
  }

});



export const getAllStudents = async (req, res) => {
  try {
    // Fetch all students and populate the 'course' field
    const students = await Student.find().populate('course');

    // Fetch user data associated with each student
    const studentsWithUserData = await Promise.all(students.map(async (student) => {
      const associatedUser = await User.findOne({ email: student.email });
      return {
        student,
        user: associatedUser,
      };
    }));

    console.log(studentsWithUserData);
    res.status(200).json({ success: true, data: studentsWithUserData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
// @access  Private (Admin)
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {

     // Find associated User and delete it
  const associatedUser = await User.findOne({ email: student.email });
  const associatedSchoolFees = await SchoolFees.findOne({student:student._id})
  
  if (associatedUser) {
    await associatedUser.remove();
  }
  if (associatedUser) {
    await associatedSchoolFees.remove()
  }

    await student.remove();
    res.json({ success: true, message: 'Student removed' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

export const studentsByCourse = asyncHandler(async (req, res) => {
  const {id} = req.params
  const student = await Student.find({course:id});

  if (student) {
    await student.remove();
    res.json({ success: true, message: 'Student removed' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

