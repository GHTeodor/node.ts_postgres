import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH_KEY',

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS || '25m',
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH || '1w',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'CSharpyk@gmail.com',
    NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || 'iglduumiuytlycbp',
};
