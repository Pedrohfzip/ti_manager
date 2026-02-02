import Router from 'express';
import ActiveDirectoryController from '../controllers/ActiveDirectoryController.js';
const router = Router();


router.get('/data', ActiveDirectoryController.getData);
router.get('/users', ActiveDirectoryController.getUsers);

export default router;