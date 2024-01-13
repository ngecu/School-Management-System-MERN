import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { createSchoolFees, getAllSchoolFees, getSchoolFeesByStudentId, markSchoolFeesAsPaid } from '../controllers/feesControllers.js'

router.route('/').post(protect, admin,createSchoolFees)
router.route('/').get(getAllSchoolFees)
router.route('/student/:id').get(protect, getSchoolFeesByStudentId);
router.route('/student/:id').put(protect, markSchoolFeesAsPaid);


export default router
