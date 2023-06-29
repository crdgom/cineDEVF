import { Router } from 'express';
import { getAdministrators, createAdministrator } from '../controllers/administratorsController.js';

const router = Router();

// * Endpoints for Administrators (CRUD) operations (getAdmins, getAdmin, createAdministrator, updateAdmin, deleteAdmin)

router.get('/api/v1/getAdministrators', getAdministrators);
router.get('/api/v1/getAdministrator');
router.post('/api/v1/createAdministrator', createAdministrator);
router.put('/api/v1/updateAdministrator');
router.delete('/api/v1/deleteAdministrator');

export default router