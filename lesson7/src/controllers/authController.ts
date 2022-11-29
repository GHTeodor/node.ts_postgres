import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../configs';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entities/user';

class AuthController {
    async registration(req: Request, res: Response): Promise<Response<any>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
        // return res.send('<h1>registration</h1>');
    }

    async login(req: Request, res: Response): Promise<Response<any>> {
        // await authService.login();
        return res.send('<h1>login</h1>');
    }

    async refresh(req: Request, res: Response): Promise<Response<any>> {
        // await authService.refresh();
        return res.send('<h1>refresh</h1>');
    }

    async logout(req: IRequestExtended, res: Response): Promise<Response<any>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(id);
        return res.send('<h1>logout</h1>');
    }
}

export const authController = new AuthController();
