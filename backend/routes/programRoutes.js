import express from 'express';
import {
  createProgram,
  getPrograms,
  getProgramDetails,
} from '../controllers/programController.js';

const router = express.Router();

router.route('/')
  .get(getPrograms)
  .post(createProgram);

router.get('/:id', getProgramDetails);

export default router;