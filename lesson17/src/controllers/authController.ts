import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { constant, COOKIE, EmailActionEnum } from '../configs';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entities/user';
import { tokenRepository } from '../repositories';
import { ErrorHandler } from '../errors';

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getByEmail(email);

            if (userFromDb) {
                throw new ErrorHandler(`User with email: ${email} alerady exist`);
            }

            // const userNormalized = Object.assign(req.body, { email: req.body.email.trim().toLowerCase() });
            const createdUser = await userService.createOne(req.body);

            // UPLOAD PHOTO
            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);
                console.log('-------sendData.Location--------');
                console.log(sendData.Location);
                console.log('-------sendData.Location--------');
            }

            // UPDATE USER
            const tokenData = await authService.registration(createdUser);

            res.cookie(
                COOKIE.nameRefreshToken,
                tokenData.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.json(tokenData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, EmailActionEnum.WELCOME, { userName: 'Teodor' });

            await userService.compareUserPassword(password, hashPassword);

            const { refreshToken, accessToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            next(e);
            // res.status(400).json(e.message);
        }
    }

    async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const currentRefreshToken = req.get(constant.AUTHORIZATION);

            await tokenService.getTokenPairByParams({ refreshToken: currentRefreshToken });

            const { accessToken, refreshToken } = tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e: any) {
            next(e);
            // res.status(400).json(e.message);
        }
    }

    async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteUserTokenPair(id);
        return res.send('<h1>Logout OK</h1>');
    }
}

export const authController = new AuthController();
