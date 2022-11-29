import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';

import { config } from '../configs';
import { ITokenPair, IUserPayload } from '../interfaces';
import { IToken } from '../entities/token';
import { tokenRepository } from '../repositories/tokenRepository';

class TokenService {
    async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS as string },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH as string },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }

    async deleteUserTokenPair(userId: number): Promise<DeleteResult> {
        return tokenRepository.deleteByParams({ userId });
    }
}

export const tokenService = new TokenService();
