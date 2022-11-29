import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config, EmailActionEnum, emailInfo } from '../configs';

class EmailService {
    async sendMail(userMail: string, action: EmailActionEnum, context = {}): Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo[action];

        const templateRenderer = new EmailTemplate({
            views: {
                // @ts-ignore
                root: path.join(global.rootDir, 'email-templates'),
            },
        });

        Object.assign(context, { frontendURL: 'https://www.google.com/' });

        const html = await templateRenderer.render(templateName, context);


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
