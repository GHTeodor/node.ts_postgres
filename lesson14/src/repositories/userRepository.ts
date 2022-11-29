import {
    DeleteResult, EntityRepository, getManager, MoreThanOrEqual, Repository,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, User } from '../entities/user';
import { IUserRepository } from './interfaces/userRepository.interface';
import { IPaginationResponse } from './interfaces/paginationResponse.interface';

dayjs.extend(utc);

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

    async getNewUsers(): Promise<[IUser[], number]> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where({ // less - older, more - newer, than today
                // createdAt: LessThanOrEqual(dayjs().utc().startOf('day').format()),
                createdAt: MoreThanOrEqual(dayjs().utc().startOf('day').format()),
            })
            .getManyAndCount();
    }

    async getUserPagination(searchObject: Partial<IUser>, limit: number, page: number): Promise<IPaginationResponse<IUser>> {
        const skip = limit * (page - 1);

        const [users, itemCount] = await getManager().getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        return {
            page,
            perPage: limit,
            itemCount,
            data: users,
        };
    }
}
export const userRepository = new UserRepository();
