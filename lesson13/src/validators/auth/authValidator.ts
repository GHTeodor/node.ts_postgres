import * as Joi from 'joi';

import { commonValidator } from '../common/emailValidator';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.message('Email is not valid').trim(),
        // email: emailValidator.messages({ 'any.only': 'GENERAL_MESSAGE_HERE' }).trim(),
        password: Joi.string().required().min(8),
    }),
};

// import { Joi, Segments } from 'celebrate';
//
// import { emailValidator } from '../common/emailValidator';
//
// export const authValidator = {
//     login: {
//         [Segments.BODY]: Joi.object({
//             // email: Joi.string().email().required(),
//             email: emailValidator.message('Email is not valid'),
//             password: Joi.string()
//                 .min(8)
//                 .required(),
//         }),
//     },
// };
