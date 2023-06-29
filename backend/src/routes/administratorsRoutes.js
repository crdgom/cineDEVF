import { Router } from 'express';
import { getAdministrators, getAdministrator, createAdministrator, updateAdministrator, deleteAdministrator, login } from '../controllers/administratorsController.js';
import isAdmin from '../middlewares/administratorsMiddelware.js';
const router = Router();

// * Endpoints for Administrators (CRUD) operations (getAdmins, getAdmin, createAdministrator, updateAdmin, deleteAdmin)

router.get('/api/v1/getAdministrators', isAdmin,  getAdministrators);
router.get('/api/v1/getAdministrator', isAdmin, getAdministrator);
router.post('/api/v1/createAdministrator', isAdmin, createAdministrator);
router.put('/api/v1/updateAdministrator', isAdmin, updateAdministrator);
router.delete('/api/v1/deleteAdministrator', isAdmin, deleteAdministrator);

// * Endpoints for login

router.post('/api/v1/administratorLogin', login);

export default router