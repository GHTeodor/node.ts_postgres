import { Router } from 'express';

import { authController } from '../controllers';
import { authMiddleware, fileMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', fileMiddleware.checkUserAvatar, authController.registration);
router.post('/login', authMiddleware.isLoginValid, userMiddleware.checkIfUserExists, authController.login);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;
