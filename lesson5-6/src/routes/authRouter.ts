import { Router } from 'express';

import { authController } from '../controllers';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export const authRouter = router;
