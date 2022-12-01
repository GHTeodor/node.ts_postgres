import { Column, Entity, OneToMany } from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { IPost, Post } from './post';

export interface IUser extends ICommonFields {
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    phone: string;
    password: string;
    posts: IPost[];
}
@Entity('users', { database: 'typeorm_db' })
export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
        nullable: true,
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
        transformer: {
            to: (value: string) => value.toLowerCase().trim(),
            from: (value: string) => value,
        },
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        password: string;

    @OneToMany(() => Post, (post) => post.user)
        posts: IPost[];
}
