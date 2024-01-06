import asyncHandler from 'express-async-handler';
import Accountant from '../models/accountantModel.js';
import User from '../models/userModel.js';

export const addAccountant = asyncHandler(async (req, res) => {
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
  const accountantExists = await Accountant.findOne({ email });

  if (accountantExists) {
    res.status(400);
    throw new Error('Accountant already exists');
  }

  const accountant = await Accountant.create({
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

  if (accountant) {

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      firstName,
      secondName:lastName,
      email,
      password,
      userType:"Accountant",
      
    })

    if (user) {
      res.status(200).json({
        message: "Accountant registered successfully",
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }

  } else {
    res.status(400);
    throw new Error('Invalid accountant data');
  }
});

export const getAllAccountants = async (req, res) => {
  try {
    console.log("Fetching all Accountants");
    const accountants = await Accountant.find();
    console.log(accountants);
    res.status(200).json({ success: true, data: accountants });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
