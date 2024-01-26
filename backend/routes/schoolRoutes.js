import express from 'express'
const school_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createSchool, deleteSchoolById, getAllSchools, getSchoolById, updateSchoolById } from '../controllers/schoolController.js'

school_router.route('/').post(protect, admin,createSchool)
school_router.route('/').get(protect, admin,getAllSchools)
school_router.route('/:id').get(getSchoolById)
school_router.route('/:id').put(updateSchoolById)
school_router.route('/:id').delete(deleteSchoolById)


export default school_router