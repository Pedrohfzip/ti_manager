import Router from 'express';
import DeviceController from '../controllers/DeviceController.js';
const router = Router();


router.get('/all', DeviceController.getAllDevices);
router.post('/details', DeviceController.getDeviceDetails);
router.post('/update', DeviceController.editDevice);
router.post('/delete/:id', DeviceController.deleteDevice);
export default router;