import { Router } from 'express';

const routes = Router();

// * Endpoints for seats (CRUD) operations (getSeats, getSeat, createSeat, updateSeat, deleteSeat)

routes.get('/api/v1/getSeats');
routes.get('/api/v1/getSeat');
routes.post('/api/v1/createSeat');
routes.put('/api/v1/updateSeat');
routes.delete('/api/v1/deleteSeat');

export default routes;
