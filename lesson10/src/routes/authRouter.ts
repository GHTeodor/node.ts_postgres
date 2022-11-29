import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authController } from '../controllers';
import { authMiddleware, userMiddleware } from '../middlewares';
import { authValidator } from '../validators';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', celebrate(authValidator.login), userMiddleware.checkIfUserExists, authController.login);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
