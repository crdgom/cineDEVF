import { Router } from 'express';

const router = Router();

// * Endpoints for cinema complex (CRUD) operations (getCinemaComplexes, getCinemaComplex, createCinemaComplex, updateCinemaComplex, deleteCinemaComplex)

router.get('/api/v1/getComplexes');
router.get('/api/v1/getComplex');
router.post('/api/v1/createComplex');
router.put('/api/v1/updateComplex');
router.delete('/api/v1/deleteComplex');

export default router;