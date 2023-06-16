import { Router } from 'express';
import { getAdmin } from '../controllers/administratorsController.js';

const router = Router();

// * Endpoints for Administrators (CRUD) operations (getAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin)

router.get('/api/v1/getAdministrators');
router.get('/api/v1/getAdministrator', getAdmin);
router.post('/api/v1/createAdministrator');
router.put('/api/v1/updateAdministrator');
router.delete('/api/v1/deleteAdministrator');

export default router