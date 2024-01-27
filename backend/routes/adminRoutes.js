import express from 'express';
const router = express.Router();
import { addAdmin, deleteAdmin, getAdminById, getAllAdmins, updateAdmin } from '../controllers/adminControllers.js';

router.route('/').post(addAdmin)
router.route('/').get(getAllAdmins)
router.route('/:id').get(getAdminById)
router.route('/:id').get(updateAdmin)
router.route('/:id').get(deleteAdmin)

export default router;