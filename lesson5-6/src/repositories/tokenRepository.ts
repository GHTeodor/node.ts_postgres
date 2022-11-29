import { getManager } from 'typeorm';

import { ITokenRepository } from './interfaces/tokenRepository.interface';
import { IToken, Token } from '../entities/token';

class TokenRepository implements ITokenRepository {
    async createToken(token: any): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token)
            .findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
