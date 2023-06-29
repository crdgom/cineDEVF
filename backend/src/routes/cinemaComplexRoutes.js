import { Router } from 'express';
import { getCinemaComplexes, getCinemaComplex, createCinemaComplex, updateCinemaComplex, deleteCinemaComplex } from '../controllers/cinemaComplexController.js';
import isAdmin from '../middlewares/administratorsMiddleware.js';

const router = Router();

// * Endpoints for cinema complex (CRUD) operations (getCinemaComplexes, getCinemaComplex, createCinemaComplex, updateCinemaComplex, deleteCinemaComplex)

router.get('/api/v1/getComplexes', isAdmin, getCinemaComplexes);
router.get('/api/v1/getComplex', getCinemaComplex);
router.post('/api/v1/createComplex', isAdmin,  createCinemaComplex);
router.put('/api/v1/updateComplex', isAdmin,  updateCinemaComplex);
router.delete('/api/v1/deleteComplex', isAdmin,  deleteCinemaComplex);

export default router;