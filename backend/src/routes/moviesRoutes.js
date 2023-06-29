import { Router } from 'express';
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from '../controllers/moviesController.js';

const router = Router();

// * Endpoints for movies (CRUD) operations (getMovies, getMovie, createMovie, updateMovie, deleteMovie)

router.get('/api/v1/getMovies');
router.get('/api/v1/getMovie');
router.post('/api/v1/createMovie', createMovie);
router.put('/api/v1/updateMovie');
router.delete('/api/v1/deleteMovie');

export default router;