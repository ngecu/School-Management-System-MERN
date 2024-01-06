import asyncHandler from 'express-async-handler';
import Lecturer from '../models/lecturerModel.js';
import Parent from '../models/parentModel.js';
import {v4} from 'uuid'
import User from '../models/userModel.js';

export const addLecturer = asyncHandler(async (req, res) => {
  const {
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
    school,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;

  const lecturerExists = await Lecturer.findOne({ email });

  if (lecturerExists) {
    res.status(400);
    throw new Error('Lecturer already exists');
  }

  const lecturer = await Lecturer.create({
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
    school,
    status,
    lastLoginDate,
    lastLoginIp,
  });

  if (lecturer) {
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
      userType: "Lecturer",
      // Add other relevant fields based on your User schema
    });

    if (user) {
      res.status(200).json({
        message: "Lecturer registered successfully",
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } else {
    res.status(400);
    throw new Error('Invalid lecturer data');
  }
});



export const getAllLecturers = async (req, res) => {
  try {
    console.log("fetching all lecturers");
    const lecturers = await Lecturer.find().populate('school');
    console.log(lecturers);
    res.status(200).json({ success: true, data: lecturers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

