import { DeleteResult } from 'typeorm';

import { IToken } from '../../entities/token';

export interface ITokenRepository {
    createToken(token: string): Promise<IToken>;
    findTokenByUserId(userId: number): Promise<IToken | undefined>;

    deleteByParams(findObject: Partial<IToken>): Promise<DeleteResult>;
}
