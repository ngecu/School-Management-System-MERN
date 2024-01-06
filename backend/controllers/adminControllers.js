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
