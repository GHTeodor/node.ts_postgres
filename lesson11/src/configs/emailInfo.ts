import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to nodemailer',
        html: 'Hello this is welcome mail',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account has been blocked',
        html: 'Oops account has been blocked',
    },
};
