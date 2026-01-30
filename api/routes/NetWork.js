import Router from 'express';
import  NetWorkController  from '../controllers/NetWorkController.js';
const router = Router();

router.get('/devices', NetWorkController.getNetworkDevices);
router.get('/updateList', NetWorkController.updateDevicesFromNetwork);

export default router;