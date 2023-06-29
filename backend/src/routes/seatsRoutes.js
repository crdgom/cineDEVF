import { Router } from 'express';
import { getSeats, updateSeats } from '../controllers/seatsController.js';
import isEmployee from '../middlewares/employeesMiddleware.js';

const routes = Router();

// * Endpoints for seats (CRUD) operations (getSeats, getSeat, createSeat, updateSeat, deleteSeat)

routes.get('/api/v1/getSeats', isEmployee, getSeats);
routes.put('/api/v1/updateSeatState', isEmployee, updateSeats);

export default routes;
