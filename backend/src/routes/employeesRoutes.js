import { Router } from "express";
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, login } from "../controllers/employeesController.js";
import isAdmin from '../middlewares/administratorsMiddleware.js';

const router = Router();

// * Endpoints for employees (CRUD) operations (getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee)

router.get("/api/v1/getEmployees", isAdmin, getEmployees);
router.get("/api/v1/getEmployee/:id", isAdmin,  getEmployee);
router.post("/api/v1/createEmployee", isAdmin,  createEmployee);
router.put("/api/v1/updateEmployee", isAdmin,  updateEmployee);
router.delete("/api/v1/deleteEmployee", isAdmin,  deleteEmployee);

// * Endpoints for login

router.post('/api/v1/employeesLogin', login);

export default router;