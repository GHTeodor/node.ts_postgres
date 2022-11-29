import jwt from 'jsonwebtoken';

import { config } from '../configs';
import { ITokenPair } from '../interfaces';
import { IToken } from '../entities/token';
import { tokenRepository } from '../repositories/tokenRepository';

class TokenService {
    async generateTokenPair(payload: any): Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS_KEY as string, { expiresIn: '25m' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH_KEY as string, { expiresIn: '1w' });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: any): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }
}

export const tokenService = new TokenService();
