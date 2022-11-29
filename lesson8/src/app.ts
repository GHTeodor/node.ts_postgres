import express from 'express';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { apiRouter } from './routes/apiRouter';
import { config } from './configs';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;
app.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) console.log('Database connected...');
    } catch (e) {
        console.log(e);
    }
    console.log(`Server has been started on http://localhost:${PORT} ...🚀🚀🚀`);
});
