import { Router } from 'express';
import { getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium, getAuditoriumsByCinemaComplex } from '../controllers/auditoriumsController.js';
import isAdmin from '../middlewares/administratorsMiddleware.js';
import isEmployee from '../middlewares/employeesMiddleware.js';

const router = Router();

// * Endpoints for auditoriums (CRUD) operations (getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium)

router.get('/api/v1/getAuditoriums', isEmployee, getAuditoriums);
router.get('/api/v1/getAuditorium/:id', isEmployee,  getAuditorium);
router.get('/api/v1/getAuditoriumsByCinemaComplex/:cinemaComplexName', isEmployee, getAuditoriumsByCinemaComplex);
router.post('/api/v1/createAuditorium', isAdmin,  createAuditorium);
router.put('/api/v1/updateAuditorium/:id', isAdmin,  updateAuditorium);
router.delete('/api/v1/deleteAuditorium/:id', isAdmin,  deleteAuditorium);

export default router;