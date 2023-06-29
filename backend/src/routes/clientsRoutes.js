import { Router } from "express";
import { getClients, getClient, createClient, updateClient, deleteClient, login} from "../controllers/clientsController.js";
import isAdmin from "../middlewares/administratorsMiddleware.js";
import isEmployee from "../middlewares/employeesMiddleware.js";
import isClient from "../middlewares/clientsMiddleware.js";


const router = Router();

// * Endpoints for clients (CRUD) operations (getClients, getClient, createClient, updateClient, deleteClient)

router.get("/api/v1/getClients", isEmployee, getClients);
router.get("/api/v1/getClient", isClient, getClient);
router.post("/api/v1/createClient", isClient, createClient);
router.put("/api/v1/updateClient", isClient, updateClient);
router.delete("/api/v1/deleteClient", isAdmin, deleteClient);

// * Endpoint for login

router.post("/api/v1/login", login);

export default router;