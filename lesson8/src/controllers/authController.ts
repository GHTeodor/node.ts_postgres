import { Request, Response } from 'express';

import { authService, tokenService, userService } from '../services';
import { COOKIE } from '../configs';
import { IRequestExtended, ITokenPair } from '../interfaces';
import { IUser } from '../entities/user';
import { tokenRepository } from '../repositories/tokenRepository';

class AuthController {
    async registration(req: Request, res: Response): Promise<Response<ITokenPair>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            return res.status(400).json(e.message);
        }
    }

    async refresh(req: Request, res: Response): Promise<Response<string>> {
        // await authService.refresh();
        return res.send('<h1>Refresh OK</h1>');
    }

    async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(id);
        return res.send('<h1>Logout OK</h1>');
    }
}

export const authController = new AuthController();
