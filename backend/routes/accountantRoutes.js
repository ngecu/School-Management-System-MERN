import express from 'express'
const router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addAccountant, deleteAccountant, getAccountantById, getAllAccountants, updateAccountant } from '../controllers/accountantController.js'

router.route('/').post(protect, admin,addAccountant)
router.route('/').get(protect, admin,getAllAccountants)
router.route('/:id').get(protect, admin,getAccountantById)
router.route('/:id').put(protect, admin,updateAccountant)
router.route('/:id').delete(protect, admin,deleteAccountant)


export default router
