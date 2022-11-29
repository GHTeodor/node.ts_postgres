import { DeleteResult, getManager, Repository } from 'typeorm';

import { ITokenRepository } from './interfaces/tokenRepository.interface';
import { IToken, Token } from '../entities/token';
import { ITokenDataToSave } from '../interfaces';

class TokenRepository extends Repository<Token> implements ITokenRepository {
    async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    async findByParams(filterObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(filterObject);
    }

    async deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult> {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
