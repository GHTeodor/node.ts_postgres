import { DeleteResult } from 'typeorm';

import { IUser } from '../../entities/user';

export interface IUserRepository {
    getAll(): Promise<IUser[]>;

    getByEmail(email: string): Promise<IUser | undefined>;

    getById(id: number): Promise<IUser>;

    updateById(id: number, email: string, password: string): Promise<IUser>;

    createOne(user: IUser): Promise<IUser>;

    deleteById(id: number): Promise<DeleteResult>;
}
