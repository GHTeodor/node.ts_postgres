import {
    NextFunction, Response, Request, Router,
} from 'express';

import { authRouter, postRouter, userRouter } from '.';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use('*', async (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500).json({
        message: err.message,
        data: err.data,
    });
});
// router.use((req: Request, res: Response) => res.redirect('/users'));

export const apiRouter = router;
