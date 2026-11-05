import express from 'express';
import { getDepartmentReports } from '../controllers/reportController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Assuming you have auth middleware

const router = express.Router();

router.get('/departments', protect, admin, getDepartmentReports);

export default router;