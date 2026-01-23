import { Router } from "express";
import UserRoutes from "./User.js";
const router = Router();

router.use('/users', UserRoutes);

export default router;