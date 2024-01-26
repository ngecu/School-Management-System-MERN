import asyncHandler from 'express-async-handler';
import Parent from '../models/parentModel.js';
import User from '../models/userModel.js';

export const addParent = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    fullName,
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
    fullName,
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
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      firstName:fullName,
      secondName: fullName, // Assuming you have a variable named secondName
      email,
      password,
      userType: "Parent",
      // Add other relevant fields based on your User schema
    });

    if (user) {
      res.status(200).json({
        message: "Parent registered successfully",
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
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

// @desc    Get a single parent by ID
// @route   GET /api/parents/:id
// @access  Public
export const getParentById = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.params.id).populate('students');

  if (parent) {
    res.json(parent);
  } else {
    res.status(404).json({ success: false, error: 'Parent not found' });
  }
});

// @desc    Update an existing parent
// @route   PUT /api/parents/:id
// @access  Private/Admin
export const updateParent = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    fullName,
    surname,
    dob,
    phone,
    gender,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;

  const parent = await Parent.findById(req.params.id);

  if (parent) {
    parent.email = email;
    parent.password = password;
    parent.fullName = fullName;
    parent.surname = surname;
    parent.dob = dob;
    parent.phone = phone;
    parent.gender = gender;
    parent.status = status;
    parent.lastLoginDate = lastLoginDate;
    parent.lastLoginIp = lastLoginIp;

    const updatedParent = await parent.save();
    res.json(updatedParent);
  } else {
    res.status(404).json({ success: false, error: 'Parent not found' });
  }
});

// @desc    Delete a parent
// @route   DELETE /api/parents/:id
// @access  Private/Admin
export const deleteParent = asyncHandler(async (req, res) => {
  const parent = await Parent.findById(req.params.id);

  if (parent) {
    await parent.remove();
    res.json({ success: true, data: {} });
  } else {
    res.status(404).json({ success: false, error: 'Parent not found' });
  }
});
