import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addLecturer, deleteLecturer, getAllLecturers, updateLecturer } from '../controllers/lecturerController.js'

router.route('/').post(protect, admin,addLecturer)
router.route('/').get(getAllLecturers)
router.route('/:id').put(protect, admin,updateLecturer)
router.route('/:id').delete(protect, admin,deleteLecturer)



export default router
