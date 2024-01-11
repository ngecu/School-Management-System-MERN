import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import Token from '../models/tokenModel.js'
import crypto from 'crypto';
import fs from 'fs';
import handlebars from 'handlebars'
import useragent from 'useragent'
import sendEmail from '../utils/sendEmail.js'
import Student from '../models/studentModel.js';
import Parent from '../models/parentModel.js';
import Admin from '../models/adminModel.js';
import Accountant from '../models/accountantModel.js';
import Lecturer from '../models/lecturerModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const userDetails = {
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      userType: user.userType,
      verified: user.verified,
      token: generateToken(user._id),
    };
  
    const modelMap = {
      Student: Student,
      Lecturer: Lecturer,
      Accountant: Accountant,
      Admin: Admin,
      Parent: Parent,
    };
  
    if (modelMap[user.userType]) {
      const userData = await modelMap[user.userType].findOne({ email: user.email });
      if (userData) {
        userDetails.userData = userData.toObject();
      }
    }

    console.log(userDetails);
  
    res.json(userDetails);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  
})


const registerUser = asyncHandler(async (req, res) => {
  const { firstName, secondName, email, password, userType,isAdmin } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    secondName,
    email,
    password,
    userType,
    isAdmin
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
      userType: user.userType,
      verified: user.verified,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



const templateFilePath = "backend/templates/reset-password-template.hbs"

// Function to read the contents of the HTML template file
const readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (error, htmlContent) => {
      if (error) {
        reject(error);
      } else {
        resolve(htmlContent);
      }
    });
  });
};

// Function to compile and render the email template
const renderEmailTemplate = (template, data) => {
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
};


const sendRestPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (user) {
    let token = await Token.findOne({ userId: user._id });

		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}



    const url = `${process.env.BASE_URL}new-password/${user._id}/${token.token}/`;

    // Example user agent string
    const userAgentString = req.headers['user-agent'];

    // Parse the user agent string
    const agent = useragent.parse(userAgentString);

    // Retrieve the browser name
    const browserName = agent.family;

    // Retrieve the operating system
    const operatingSystem = agent.os.toString();

    readHTMLFile(templateFilePath)
  .then((templateContent) => {
    // Define the data for the template variables
    const templateData = {
      name: user.firstName,
      email: user.email,
      browserName,
      operatingSystem,
      action_url:url
    };

    // Render the email template with the data
    const renderedTemplate = renderEmailTemplate(templateContent, templateData);

    // Send the email
    sendEmail(user.email, "Reset Email", renderedTemplate)
      .then(() => {
       
        res.status(200).send({ message: "Password reset link sent to your email account" });

      })
      .catch((error) => {
        console.log('Failed to send email:', error);
      });
  })
  .catch((error) => {
    console.log('Failed to read template file:', error);
  });
  } else {
    res.status(401)
    throw new Error('User Does Not Exist')
  }
})

const verifyResetPassword = asyncHandler(async (req,res)=>{
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
    console.log(user._id.toString())
    const resetPasswordLink = `http://localhost:3000/new-password/${user._id.toString()}/${token.token}`;
    res.redirect(resetPasswordLink);
    // res.status(200).send(`http://localhost:3000/new-password/${user._id.toString()}/${token.token}`);
	} catch (error) {
    console.log(error)
		res.status(500).send({ message: "Internal Server Error ",error });
	}
})

const setNewPassword = asyncHandler(async (req, res) => {
	try {

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		// if (!user.verified) return res.status(400).send({ message: "Invalid link" });
    // $2a$10$NkwMc8U5nV214hHBIQVNau6POGP2R4mv49Lb9cirTLY/Cb96I9sGi
    if (req.body.password) {
      user.password = req.body.password
    }

    // const updatedUser = await user.save()

		// const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(req.body.password, salt);

		// user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
})


const getAllUsers = async (req, res) => {
  try {
    console.log("fetching all students");
    const students = await User.find();
    console.log(students);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProfile = asyncHandler(async (req, res) => {

  const { firstName, secondName, email, password, userType,photo,phone, isAdmin, profileData } = req.body;
  console.log(req.body);
  // Update common user details in User model
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.firstName = firstName || user.firstName;
  user.secondName = secondName || user.secondName;
  user.email = email || user.email;

  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  // Update user type specific details
  const modelMap = {
    Student: Student,
    Lecturer: Lecturer,
    Accountant: Accountant,
    Admin: Admin,
    Parent: Parent,
  };

  if (modelMap[userType]) {
    const userTypeModelUpdating = await modelMap[userType].findOne({email});

    const userTypeModel = await modelMap[userType].findOneAndUpdate(
      { email: updatedUser.email },
      {
        $set: {
          photo: photo || userTypeModelUpdating.photo,
          email: email || userTypeModelUpdating.email,
          phone: phone || userTypeModelUpdating.phone,
        },
      },

      { new: true, upsert: true }
    );

    if (userTypeModel) {
      const userDetails = updatedUser.toObject()
      userDetails.userData = userTypeModel.toObject()
      userDetails.token = generateToken(user._id)
      res.status(200).json(userDetails);
    } else {
      res.status(500);
      throw new Error('Failed to update user type specific details');
    }
  } else {
    res.status(400);
    throw new Error('Invalid user type');
  }
});

export {
  authUser,
  registerUser,
  sendRestPassword,
  verifyResetPassword,
  setNewPassword,
  getAllUsers,
  updateProfile
}
