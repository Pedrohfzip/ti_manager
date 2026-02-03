import { Router } from "express";
import UserRoutes from "./User.js";
import ActiveDiretory from "./ActiveDiretory.js";
import DevicesRoutes from "./Devices.js";
import NetWorkRoutes from "./NetWork.js";
import EmployeesRoutes from "./Employees.js";
const router = Router();

router.use('/users', UserRoutes);
router.use('/active-directory', ActiveDiretory);
router.use('/devices', DevicesRoutes);
router.use('/network', NetWorkRoutes);
router.use('/employees', EmployeesRoutes);

export default router;