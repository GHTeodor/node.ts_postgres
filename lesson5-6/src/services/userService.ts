import bcrypt from 'bcrypt';

import { IUser } from '../entities/user';
import { userRepository } from '../repositories';

class UserService {
    async getAll(): Promise<IUser[]> {
        const allUsers = await userRepository.getAll();
        return allUsers;
    }

    async createOne(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hashPassword(password);
        const userToSave = { ...user, password: hashedPassword };

        const createdUser = await userRepository.createOne(userToSave);
        return createdUser;
    }

    async getById(id: number): Promise<IUser> {
        const userById = await userRepository.getById(id);
        return userById;
    }

    async getByEmail(email: string): Promise<IUser | undefined> {
        const userByEmail = await userRepository.getByEmail(email);
        return userByEmail;
    }

    async updateById(id: number, email: string, password: string): Promise<IUser> {
        return userRepository.updateById(id, email, password);
    }

    async deleteById(id: number): Promise<void> {
        await userRepository.deleteById(id);
    }

    // =============================================================

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
