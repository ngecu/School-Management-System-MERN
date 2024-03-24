import asyncHandler from 'express-async-handler';
import Accountant from '../models/accountantModel.js';
import User from '../models/userModel.js';

export const addAccountant = asyncHandler(async (req, res) => {
  const password = "accountantPassword123";

  const {
    email,
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
    const accountants = await Accountant.find();
    
    // Fetch user data associated with each accountant
    const accountantsWithUserData = await Promise.all(accountants.map(async (accountant) => {
      const associatedUser = await User.findOne({ email: accountant.email });
      return {
        accountant,
        user: associatedUser,
      };
    }));

    res.status(200).json({ success: true, data: accountantsWithUserData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get a single accountant by ID
// @route   GET /api/accountants/:id
// @access  Public
export const getAccountantById = asyncHandler(async (req, res) => {
  const accountant = await Accountant.findById(req.params.id);

  if (accountant) {
    res.json(accountant);
  } else {
    res.status(404);
    throw new Error('Accountant not found');
  }
});

// @desc    Update an existing accountant
// @route   PUT /api/accountants/:id
// @access  Private
export const updateAccountant = asyncHandler(async (req, res) => {
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

  const accountant = await Accountant.findById(req.params.id);

  if (accountant) {
    accountant.email = email;
    accountant.password = password;
    accountant.firstName = firstName;
    accountant.lastName = lastName;
    accountant.gender = gender;
    accountant.dob = dob;
    accountant.phone = phone;
    accountant.nationalID = nationalID;
    accountant.status = status;
    accountant.lastLoginDate = lastLoginDate;
    accountant.lastLoginIp = lastLoginIp;

    const updatedAccountant = await accountant.save();
    res.json(updatedAccountant);
  } else {
    res.status(404);
    throw new Error('Accountant not found');
  }
});

// @desc    Delete an accountant
// @route   DELETE /api/accountants/:id
// @access  Private
export const deleteAccountant = asyncHandler(async (req, res) => {
  const accountant = await Accountant.findById(req.params.id);

  if (accountant) {
    await accountant.remove();
    res.json({ message: 'Accountant removed' });
  } else {
    res.status(404);
    throw new Error('Accountant not found');
  }
});
