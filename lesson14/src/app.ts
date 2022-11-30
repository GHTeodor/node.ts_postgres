import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { apiRouter } from './routes/apiRouter';
import { config } from './configs';
import { cronRun } from './cron';

// @ts-ignore
global.rootDir = __dirname;

const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
            cronRun();
        }
    } catch (e) {
        console.log(e);
    }
    console.log(`Server has been started on http://localhost:${PORT} ...🚀🚀🚀`);
});
