import express from 'express';
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from '../controllers/ticketController.js';
import isAdmin from '../middlewares/administratorsMiddleware.js';
import isEmployee from '../middlewares/employeesMiddleware.js';
import isClient from '../middlewares/clientsMiddleware.js';

const router = express.Router();

// * Endpoints for tickets (CRUD) operations (getTickets, getTicket, createTicket, updateTicket, deleteTicket)

router.get('/api/v1/getTickets', isAdmin, getTickets);
router.get('/api/v1/getTicket/:id', isClient, getTicketById);
router.post('/api/v1/createTicket', isClient, createTicket);
router.put('/api/v1/updateTickets/:id', isEmployee, updateTicket);
router.delete('/api/v1/deleteTickets/:id', isAdmin, deleteTicket);

export default router;
