import { Router } from "express";

const router = Router();

// * Endpoints for clients (CRUD) operations (getClients, getClient, createClient, updateClient, deleteClient)

router.get("/api/v1/getClients");
router.get("/api/v1/getClient");
router.post("/api/v1/createClient");
router.put("/api/v1/updateClient");
router.delete("/api/v1/deleteClient");

export default router;