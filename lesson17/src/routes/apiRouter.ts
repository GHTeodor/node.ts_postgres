import {
    NextFunction, Response, Request, Router,
} from 'express';
import swaggerUI from 'swagger-ui-express';

import docs from '../docs/swagger.json';
import {
    authRouter, postRouter, studentRouter, userRouter,
} from '.';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);
router.use('*', async (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code || 500).json({
        message: err.message,
        data: err.data,
    });
});
// router.use((req: Request, res: Response) => res.redirect('/users'));

export const apiRouter = router;
