import { Request, Response } from 'express';

import { IUser } from '../entities/user';
import { userService } from '../services';

class UserController {
    async createOne(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createOne(req.body);
        return res.json(createdUser);
    }

    async getByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const userByEmail = await userService.getByEmail(email);
        return res.json(userByEmail);
    }

    async getAll(req: Request, res: Response): Promise<Response<IUser>> {
        return res.json(await userService.getAll());
    }

    async getById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        return res.json(await userService.getById(Number(id)));
    }

    async updateById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        const { password, email } = req.body;

        const updatedUser = await userService.updateById(Number(id), email, password);

        return res.json(updatedUser);
    }

    async deleteById(req: Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;
        await userService.deleteById(Number(id));
        return res.json(id);
    }
}

export const userController = new UserController();
