import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { IUser, User } from '../entities/user';
import { IUserRepository } from './interfaces/userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    async getAll(): Promise<IUser[]> {
        const users = await getManager().getRepository(User).find({ relations: ['posts'] });
        return users;
    }

    async createOne(user: IUser): Promise<IUser> {
        const createdUser = await getManager().getRepository(User).save(user);
        return createdUser;
    }

    async getById(id: number): Promise<IUser> {
        const userById = await getManager().getRepository(User)
            .createQueryBuilder('user')
            // .where('user.id = :id', { id })
            .whereInIds(id)
            .andWhere('user.deletedAt IS NULL')
            .getOne();
        return userById || new User();
    }

    async getByEmail(email: string): Promise<IUser | undefined> {
        const userByEmail = await getManager().getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
        return userByEmail;
    }

    async updateById(id: number, email: string, password: string): Promise<any> {
        const updatedUser = await getManager().getRepository(User)
            .update(
                { id: Number(id) },
                {
                    password,
                    email,
                },
            );

        return updatedUser;
    }

    async deleteById(id: number): Promise<DeleteResult> {
        return getManager().getRepository(User).softDelete(id);
    }
}
export const userRepository = new UserRepository();
