import { Router } from "express";
import UserRoutes from "./User.js";
import ActiveDiretory from "./ActiveDiretory.js";
import DevicesRoutes from "./Devices.js";
const router = Router();

router.use('/users', UserRoutes);
router.use('/active-directory', ActiveDiretory);
router.use('/devices', DevicesRoutes);

export default router;