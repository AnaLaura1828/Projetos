import { Router } from 'express';
import UserController from '../Controller/user.controller';

const router = Router();

const loginController = new UserController();

router.get('/validate', (req, res) => loginController.validateLoginController(req, res));
router.post('/', (req, res) => loginController.loginController(req, res));

export default router;
