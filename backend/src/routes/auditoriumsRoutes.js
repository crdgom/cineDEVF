import { Router } from 'express';
import { getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium, getAuditoriumsByCinemaComplex } from '../controllers/auditoriumsController.js';

const router = Router();

// * Endpoints for auditoriums (CRUD) operations (getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium)

router.get('/api/v1/getAuditoriums', getAuditoriums);
router.get('/api/v1/getAuditorium', getAuditorium);
router.get('/api/v1/getAuditoriumsByCinemaComplex', getAuditoriumsByCinemaComplex);
router.post('/api/v1/createAuditorium', createAuditorium);
router.put('/api/v1/updateAuditorium', updateAuditorium);
router.delete('/api/v1/deleteAuditorium', deleteAuditorium);

export default router;