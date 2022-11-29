import nodemailer from 'nodemailer';

import { config, EmailActionEnum, emailInfo } from '../configs';

class EmailService {
    sendMail(userMail: string, action: EmailActionEnum = EmailActionEnum.WELCOME) {
        const { subject, html } = emailInfo[action];

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_PASSWORD,
            },
        });

        emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
