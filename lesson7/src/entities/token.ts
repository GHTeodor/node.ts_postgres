import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields, ICommonFields } from './commonFields';
import { User, IUser } from './user';

export interface IToken extends ICommonFields {
    refreshToken: string;
    userId: number;
}

@Entity('tokens', { database: 'typeorm_db' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: IUser;
}
