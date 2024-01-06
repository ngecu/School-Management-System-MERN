import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';
import Parent from '../models/parentModel.js';
import {v4} from 'uuid'
import User from '../models/userModel.js';

export const admitStudent = asyncHandler(async (req, res) => {
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
    parents,
    status,
    lastLoginDate,
    lastLoginIp,
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
  for (const parentData of parents) {
    console.log(parentData);
    const { email, fullName, phone, relationship } = parentData;

    // Check if the parent already exists
    let parent = await Parent.findOne({ email });
    let password = v4()
    // If not, create a new parent
    if (!parent) {
      parent = await Parent.create({
        email,
        fullName,
        phone,
        password:password
      });
    }

    // Add the parent's ID to the array
    parentIds.push(parent._id);
  }
  
  // Create the student with the parent IDs
  console.log("password is ",password);

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
    password:v4()
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
      secondName:lastName, // Assuming you have a variable named secondName
      email,
      password,
      userType: "Student",
      // Add other relevant fields based on your User schema
    });

    if (user) {
      res.status(200).json({
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
    console.log("fetching all students");
    const students = await Student.find().populate('course');
    console.log(students);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

