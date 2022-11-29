import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.get('/', userController.getAll);
router.get('/:email', userController.getByEmail);
// router.get('/:id', userController.getById);
router.post('/', userController.createOne);
router.patch('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

export const userRouter = router;
