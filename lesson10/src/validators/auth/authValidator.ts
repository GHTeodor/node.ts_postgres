import { Joi, Segments } from 'celebrate';

import { emailValidator } from '../common/emailValidator';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            // email: Joi.string().email().required(),
            email: emailValidator.message('Email is not valid'),
            password: Joi.string()
                .min(8)
                .required(),
        }),
    },
};
