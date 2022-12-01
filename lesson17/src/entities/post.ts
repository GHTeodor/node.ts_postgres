import {
    Column, Entity, ManyToOne, JoinColumn,
} from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { IUser, User } from './user';

export interface IPost extends ICommonFields {
    title: string;
    text: string;
    userId: number;
}

@Entity('posts', { database: 'typeorm_db' })
export class Post extends CommonFields implements IPost {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        title: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: 'userId' })
        user: IUser;
}
