import {
    Router, Request, Response, NextFunction,
} from 'express';
import { errors } from 'celebrate';

import { authRouter, postRouter, userRouter } from '.';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use(errors({ statusCode: 400 }));
router.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500).json({
        message: err.message,
        data: err.data,
    });
});
router.use((req: Request, res: Response) => res.redirect('/users'));

export const apiRouter = router;
