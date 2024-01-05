import asyncHandler from 'express-async-handler';
import Lecturer from '../models/lecturerModel.js';
import Parent from '../models/parentModel.js';
import {v4} from 'uuid'

export const addLecturer = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
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

  

  console.log("password is ",password);

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
    password:v4()
  });

  if (lecturer) {

    res.status(200).json({
      message: 'Lecturer added successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid lecturer data');
  }
  } catch (error) {
    console.log(error);
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

