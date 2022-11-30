import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';
import { ErrorHandler } from '../errors';

class UserMiddleware {
    async checkIfUserExists(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDb = await userRepository.getByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found'));
                // res.status(404).json('User not found');
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            next(e);
            // res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
