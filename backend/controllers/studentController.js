import asyncHandler from 'express-async-handler';
import Student from '../models/studentModel.js';

const admitStudent = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    secondName,
    surname,
    dob,
    phone,
    parent,
    
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;
  const dateOfJoin = new Date()
  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(400);
    throw new Error('Student already exists');
  }

  const student = await Student.create({
    email,
    password,
    firstName,
    secondName,
    surname,
    dob,
    phone,
    parent,
    dateOfJoin,
    status,
    lastLoginDate,
    lastLoginIp,
  });

  if (student) {
    res.status(200).json({
      message: 'Student admitted successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

export { admitStudent };
