import express from 'express';
const router = express.Router();
import { addAdmin } from '../controllers/adminControllers.js';

router.route('/').post(addAdmin)

export default router;