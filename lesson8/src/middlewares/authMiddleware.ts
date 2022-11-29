import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repositories/tokenRepository';

class AuthMiddleware {
    async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDb = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getByEmail(userEmail);

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
