import { Router } from 'express';
import UserController from '../controllers/user-controller';

const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);

export default router;
