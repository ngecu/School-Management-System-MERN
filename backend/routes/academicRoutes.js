import express from 'express';
import { processStudentResults, getStudentAcademicRecords } from '../controllers/academicController.js';

const router = express.Router();

// POST endpoint to trigger the "Processing results after marks entry"
router.post('/process-results', processStudentResults);

// GET endpoint to generate the "Rigor Per Student" report
router.get('/records/:studentId', getStudentAcademicRecords);

export default router;