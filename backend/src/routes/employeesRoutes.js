import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employeesController.js";

const router = Router();

// * Endpoints for employees (CRUD) operations (getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee)

router.get("/api/v1/getEmployees");
router.get("/api/v1/getEmployee/:id");
router.post("/api/v1/createEmployee", createEmployee);
router.put("/api/v1/updateEmployee");
router.delete("/api/v1/deleteEmployee");

export default router;