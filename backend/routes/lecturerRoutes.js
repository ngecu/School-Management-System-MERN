import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addLecturer, getAllLecturers } from '../controllers/lecturerController.js'

router.route('/').post(protect, admin,addLecturer)
router.route('/').get(protect, admin,getAllLecturers)

export default router
