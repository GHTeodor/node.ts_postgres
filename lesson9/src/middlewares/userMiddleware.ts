import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories';

class UserMiddleware {
    async checkIfUserExists(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDb = await userRepository.getByEmail(req.body.email);

            if (!userFromDb) {
                res.status(404).json('User not found');
                return;
            }

            req.user = userFromDb;
            next();
        } catch (e: any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
