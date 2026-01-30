import Router from 'express';
import { getNetworkDevices } from '../controllers/NetWorkController.js';
const router = Router();

router.get('/devices', getNetworkDevices);

export default router;