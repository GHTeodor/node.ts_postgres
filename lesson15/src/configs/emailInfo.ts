import { EmailActionEnum } from './enums';

export const emailInfo = {
    [EmailActionEnum.WELCOME]: {
        subject: 'Welcome to nodemailer',
        templateName: 'welcome',
    },
    [EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account has been blocked',
        templateName: 'accountBlocked',
    },
};
