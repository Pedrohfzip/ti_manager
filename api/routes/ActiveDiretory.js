import Router from 'express';
import ActiveDirectoryController from '../controllers/ActiveDirectoryController.js';
const router = Router();


router.get('/data', ActiveDirectoryController.getData);

export default router;