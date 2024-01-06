import express from 'express'

const {
  loginController,
  registerController,
  fetchAllUsersController,
} = require("../Controllers/userController copy.js");

const { protect } = require("../middleware/authMiddleware");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/fetchUsers", protect, fetchAllUsersController);

export default router
