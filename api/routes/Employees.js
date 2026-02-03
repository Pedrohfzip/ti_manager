import Router from 'express';
import EmployeesController from '../controllers/EmployeesController.js';
const router = Router();

router.get('/all', EmployeesController.getAllEmployees);

export default router;