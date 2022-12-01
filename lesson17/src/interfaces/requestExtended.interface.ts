import { Request } from 'express';

import { IUser } from '../entities/user';

export interface IRequestExtended extends Request{
    user?: IUser;
}
