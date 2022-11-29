import { Request, Response } from 'express';
import { authService } from '../services';

class AuthController {
    async registration(req: Request, res: Response): Promise<Response<any>> {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
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

    async logout(req: Request, res: Response): Promise<Response<any>> {
        // await authService.logout();
        return res.send('<h1>logout</h1>');
    }
}

export const authController = new AuthController();
