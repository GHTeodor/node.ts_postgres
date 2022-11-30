import { IUser } from '../entities/user';
import { ITokenPair } from '../interfaces';
import { tokenService } from './tokenService';

class AuthService {
    async registration(createdUser: IUser): Promise<ITokenPair> {
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser) {
        const { id, email } = userData;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }

    // async login() {
    //
    // }
    //
    // async refresh() {
    //
    // }
    //
    // async logout() {
    //
    // }
}

export const authService = new AuthService();
