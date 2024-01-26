// adminController.js

import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';

// @desc    Create a new admin
// @route   POST /api/admins
// @access  Private/Admin
export const addAdmin = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    gender,
    dob,
    phone,
    nationalID,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;
  const dateOfJoin = new Date();
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    email,
    password,
    firstName,
    lastName,
    dateOfJoin,
    gender,
    dob,
    nationalID,
    phone,
    status,
    lastLoginDate,
    lastLoginIp,
  });

  if (admin) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      firstName,
      secondName: lastName,
      email,
      password,
      userType: "Admin",
    });

    if (user) {
      res.status(200).json({
        message: "Admin registered successfully",
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/Admin
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});

// @desc    Get a single admin by ID
// @route   GET /api/admins/:id
// @access  Private/Admin
export const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    res.json(admin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Update an existing admin
// @route   PUT /api/admins/:id
// @access  Private/Admin
export const updateAdmin = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    gender,
    dob,
    phone,
    nationalID,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;

  const admin = await Admin.findById(req.params.id);

  if (admin) {
    admin.email = email;
    admin.password = password;
    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.gender = gender;
    admin.dob = dob;
    admin.phone = phone;
    admin.nationalID = nationalID;
    admin.status = status;
    admin.lastLoginDate = lastLoginDate;
    admin.lastLoginIp = lastLoginIp;

    const updatedAdmin = await admin.save();
    res.json(updatedAdmin);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Delete an admin
// @route   DELETE /api/admins/:id
// @access  Private/Admin
export const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);

  if (admin) {
    await admin.remove();
    res.json({ message: 'Admin removed' });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});