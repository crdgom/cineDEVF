import { Router } from 'express';
import { createAuditorium } from '../controllers/auditoriumsController.js';

const router = Router();

// * Endpoints for auditoriums (CRUD) operations (getAuditoriums, getAuditorium, createAuditorium, updateAuditorium, deleteAuditorium)

router.get('/api/v1/getAuditoriums');
router.get('/api/v1/getAuditorium');
router.post('/api/v1/createAuditorium', createAuditorium);
router.put('/api/v1/updateAuditorium');
router.delete('/api/v1/deleteAuditorium');

export default router;