import { Router } from 'express';
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from '../controllers/moviesController.js';
import isAdmin from '../middlewares/administratorsMiddleware.js';
import isEmployee from '../middlewares/employeesMiddleware.js';

const router = Router();

// * Endpoints for movies (CRUD) operations (getMovies, getMovie, createMovie, updateMovie, deleteMovie)

router.get('/api/v1/getMovies',  isEmployee, getMovies);
router.get('/api/v1/getMovie',  isEmployee, getMovie);
router.post('/api/v1/createMovie', isAdmin, createMovie);
router.put('/api/v1/updateMovie', isAdmin, updateMovie);
router.delete('/api/v1/deleteMovie', isAdmin, deleteMovie);

export default router;