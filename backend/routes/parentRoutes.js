import express from 'express'
const parent_router = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'
import { addParent } from '../controllers/parentController.js'

parent_router.route('/').post(protect, admin,addParent)

export default parent_router
