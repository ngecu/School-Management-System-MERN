import express from 'express';
import { registerUnits, addOrDropUnit } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', registerUnits);
router.put('/:id/modify', addOrDropUnit);

export default router;