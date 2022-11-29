import { Request, Response, Router } from 'express';

import { authRouter, postRouter, userRouter } from '.';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use((req: Request, res: Response) => res.redirect('/users'));

export const apiRouter = router;
