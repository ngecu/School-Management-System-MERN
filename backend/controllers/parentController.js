import asyncHandler from 'express-async-handler';
import Parent from '../models/parentModel.js';

export const addParent = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    secondName,
    surname,
    dob,
    phone,
    gender,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;
  const dateOfJoin = new Date()
  const parentExists = await Parent.findOne({ email });
console.log(req.body);
  if (parentExists) {
    res.status(400);
    throw new Error('Parent already exists');
  }

  const parent = await Parent.create({
    email,
    password,
    firstName,
    secondName,
    surname,
    dateOfJoin,
    dob,
    phone,
    gender,
    status,
    lastLoginDate,
    lastLoginIp,
  });

  if (parent) {
    res.status(200).json({
      message: 'Parent added successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid parent data');
  }
});

export const getAllParents = async (req, res) => {
  try {
    console.log("fetching all Parents");
    const parents = await Parent.find().populate('students');
    console.log(parents);
    res.status(200).json({ success: true, data: parents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
