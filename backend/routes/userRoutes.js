import express from 'express'
const router = express.Router()
import {
  // verifyResetPassword,
  setNewPassword,
  registerUser,
  authUser,
  sendRestPassword,
  fetchAllUsersController
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/reset-password').post(sendRestPassword)
router.route('/change-password/:id/:token').post(setNewPassword)
router.route("/fetchUsers").get(protect, fetchAllUsersController);



router.post('/login', authUser)
export default router
