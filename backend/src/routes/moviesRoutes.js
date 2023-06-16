import { Router } from 'express';

const router = Router();

// * Endpoints for movies (CRUD) operations (getMovies, getMovie, createMovie, updateMovie, deleteMovie)

router.get('/api/v1/getMovies');
router.get('/api/v1/getMovie');
router.post('/api/v1/createMovie');
router.put('/api/v1/updateMovie');
router.delete('/api/v1/deleteMovie');

export default router;