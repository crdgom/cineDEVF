import { Router } from 'express';
import { getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium, getAuditoriumsByCinemaComplex } from '../controllers/auditoriumsController.js';
import isAdmin from '../middlewares/administratorsMiddleware.js';
import isEmployee from '../middlewares/employeesMiddleware.js';

const router = Router();

// * Endpoints for auditoriums (CRUD) operations (getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium)

router.get('/api/v1/getAuditoriums', isEmployee, getAuditoriums);
router.get('/api/v1/getAuditorium', isEmployee,  getAuditorium);
router.get('/api/v1/getAuditoriumsByCinemaComplex', isEmployee, getAuditoriumsByCinemaComplex);
router.post('/api/v1/createAuditorium', isAdmin,  createAuditorium);
router.put('/api/v1/updateAuditorium', isAdmin,  updateAuditorium);
router.delete('/api/v1/deleteAuditorium', isAdmin,  deleteAuditorium);

export default router;