import express from 'express'
const parent_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addParent, getAllParents } from '../controllers/parentController.js'

parent_router.route('/').post(protect, admin,addParent)
parent_router.route('/').get(protect, admin,getAllParents)


export default parent_router
