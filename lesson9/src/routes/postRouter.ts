import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => res.send('<h1>Post</h1>'));

export const postRouter = router;
