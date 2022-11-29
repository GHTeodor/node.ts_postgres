import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { tokenService, userService } from '../services';
import { tokenRepository } from '../repositories/tokenRepository';
import { constant } from '../configs';
import { authValidator } from '../validators';
import { ErrorHandler } from '../errors';

class AuthMiddleware {
    async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);
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
            next(e);

            // res.status(401).json({
            //     status: 401,
            //     message: e.message,
            // });
        }
    }

    async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get(constant.AUTHORIZATION);
            if (!refreshToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDb = await tokenRepository.findByParams({ refreshToken });

            if (!tokenPairFromDb) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getByEmail(userEmail);

            req.user = userFromToken;

            next();
        } catch (e: any) {
            next(e);
            // res.status(401).json({
            //     status: 401,
            //     message: e.message,
            // });
        }
    }

    // Validators
    isLoginValid(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { error } = authValidator.login.validate(req.body);

            if (error) {
                // error.details.forEach(({ message }) => next(new ErrorHandler(`${message} \n`)));
                next(new ErrorHandler(error.details[0].message));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
