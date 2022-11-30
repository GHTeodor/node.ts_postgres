import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import { createConnection } from 'typeorm';
import { Server } from 'socket.io';
import 'reflect-metadata';

import { apiRouter } from './routes/apiRouter';
import { config } from './configs';
import { socketController } from './controllers';
// import { cronRun } from './cron';

// @ts-ignore
global.rootDir = __dirname;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('__S_O_C_K_E_T__{');
    console.log('userId: ', socket.handshake.query.userId);
    console.log('accessToken: ', socket.handshake.query.accessToken);
    console.log('}__S_O_C_K_E_T__');

    socket.on('message:create', (data: any) => socketController.messageCreate(io, socket, data));
    socket.on('join_room', (data: any) => socketController.joinRoom(io, socket, data));
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;
server.listen(PORT, async () => {
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
            // cronRun();
        }
    } catch (e) {
        console.log(e);
    }
    console.log(`Server has been started on http://localhost:${PORT} ...🚀🚀🚀`);
});
