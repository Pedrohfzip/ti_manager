import Router from 'express';
import DeviceController from '../controllers/DeviceController.js';
const router = Router();


router.get('/all', DeviceController.getAllDevices);
export default router;