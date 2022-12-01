import { Router } from 'express';

import { studentController } from '../controllers';

const router = Router();

router.get('/', studentController.getAll);
router.post('/', studentController.createOne);
router.patch('/:student_id', studentController.updateById);
export const studentRouter = router;
