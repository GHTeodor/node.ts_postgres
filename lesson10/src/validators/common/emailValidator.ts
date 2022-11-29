import { Joi } from 'celebrate';

import { constant } from '../../configs';

export const emailValidator = Joi.string()
    .regex(constant.EMAIL_REGEXP);
