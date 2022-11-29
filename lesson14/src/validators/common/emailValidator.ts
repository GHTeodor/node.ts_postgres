import Joi from 'joi';

import { constant } from '../../configs';

export const commonValidator = {
    emailValidator: Joi.string().regex(constant.EMAIL_REGEXP),
};
