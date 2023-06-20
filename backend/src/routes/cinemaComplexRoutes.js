import { Router } from 'express';
import { getCinemaComplexes, getCinemaComplex, createCinemaComplex } from '../controllers/cinemaComplexController.js';

const router = Router();

// * Endpoints for cinema complex (CRUD) operations (getCinemaComplexes, getCinemaComplex, createCinemaComplex, updateCinemaComplex, deleteCinemaComplex)

router.get('/api/v1/getComplexes', getCinemaComplexes);
router.get('/api/v1/getComplex', getCinemaComplex);
router.post('/api/v1/createComplex', createCinemaComplex);
router.put('/api/v1/updateComplex');
router.delete('/api/v1/deleteComplex');

export default router;