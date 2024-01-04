import asyncHandler from 'express-async-handler';
import Parent from '../models/parentModel.js';

const addParent = asyncHandler(async (req, res) => {
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

export { addParent };
