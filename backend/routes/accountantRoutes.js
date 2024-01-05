import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addAccountant, getAllAccountants } from '../controllers/accountantController.js'

router.route('/').post(protect, admin,addAccountant)
router.route('/').get(protect, admin,getAllAccountants)


export default router
