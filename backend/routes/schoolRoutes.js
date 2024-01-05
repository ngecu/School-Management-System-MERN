import express from 'express'
const school_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createSchool, getAllSchools } from '../controllers/schoolController.js'

school_router.route('/').post(protect, admin,createSchool)
school_router.route('/').get(protect, admin,getAllSchools)


export default school_router