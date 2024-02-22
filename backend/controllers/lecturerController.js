import asyncHandler from 'express-async-handler';
import Lecturer from '../models/lecturerModel.js';
import User from '../models/userModel.js';

export const addLecturer = asyncHandler(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    gender,
    dob,
    religion,
    phone,
    nationalID,
    courses,
    school,
    status,
    lastLoginDate,
    lastLoginIp,
  } = req.body;
  const password = "lecturerPassword123"
  const lecturerExists = await Lecturer.findOne({ email });

  if (lecturerExists) {
    res.status(400);
    throw new Error('Lecturer already exists');
  }

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
    courses,
    school,
    status,
    lastLoginDate,
    lastLoginIp,
  });

  if (lecturer) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      firstName,
      secondName: lastName, // Assuming you have a variable named secondName
      email,
      password,
      userType: "Lecturer",
      // Add other relevant fields based on your User schema
    });

    if (user) {
      res.status(200).json({
        message: "Lecturer registered successfully",
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } else {
    res.status(400);
    throw new Error('Invalid lecturer data');
  }
});



export const getAllLecturers = async (req, res) => {
  try {
    console.log("fetching all lecturers");
    const lecturers = await Lecturer.find().populate('school');
    
    const lecturersWithUserData = await Promise.all(lecturers.map(async (lecturer) => {
      const associatedUser = await User.findOne({ email: lecturer.email });
      return {
        lecturer,
        user: associatedUser,
      };
    }));

    console.log(lecturersWithUserData);
    res.status(200).json({ success: true, data: lecturersWithUserData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateLecturer = asyncHandler(async (req, res) => {
  const lecturerId = req.params.id;
  const {
    email,
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

  const lecturer = await Lecturer.findById(lecturerId);

  if (!lecturer) {
    res.status(404);
    throw new Error('Lecturer not found');
  }

  lecturer.email = email || lecturer.email;
  lecturer.firstName = firstName || lecturer.firstName;
  lecturer.lastName = lastName || lecturer.lastName;
  lecturer.gender = gender || lecturer.gender;
  lecturer.dob = dob || lecturer.dob;
  lecturer.religion = religion || lecturer.religion;
  lecturer.phone = phone || lecturer.phone;
  lecturer.nationalID = nationalID || lecturer.nationalID;
  lecturer.course = course || lecturer.course;
  lecturer.school = school || lecturer.school;
  lecturer.status = status || lecturer.status;
  lecturer.lastLoginDate = lastLoginDate || lecturer.lastLoginDate;
  lecturer.lastLoginIp = lastLoginIp || lecturer.lastLoginIp;

  const updatedLecturer = await lecturer.save();

  // Update associated User
  const associatedUser = await User.findOne({ email });

  if (associatedUser) {
    associatedUser.firstName = firstName || associatedUser.firstName;
    associatedUser.secondName = lastName || associatedUser.secondName;
    associatedUser.email = email || associatedUser.email;

    await associatedUser.save();
  }

  res.status(200).json({
    success: true,
    data: updatedLecturer,
    message: 'Lecturer and associated User updated successfully',
  });
});

// Delete Lecturer and associated User
export const deleteLecturer = asyncHandler(async (req, res) => {
  const lecturerId = req.params.id;

  const lecturer = await Lecturer.findById(lecturerId);

  if (!lecturer) {
    res.status(404);
    throw new Error('Lecturer not found');
  }

  // Find associated User and delete it
  const associatedUser = await User.findOne({ email: lecturer.email });

  if (associatedUser) {
    await associatedUser.remove();
  }

  await lecturer.remove();

  res.status(200).json({
    success: true,
    message: 'Lecturer and associated User deleted successfully',
  });
});