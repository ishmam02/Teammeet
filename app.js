import http from 'http';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import bodyparser from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@ishmam_tech/common';

import { currentUserRouter } from './routes/current-user.js';
import { authRouter } from './routes/auth.js';
import PeerServer from './services/PeerServer.js';
import SocketServer from './services/SocketServer.js';

const app = express();

const server = http.createServer(app);

app.use(cors());
app.set('trust proxy', true);
app.use(bodyparser.json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);

app.use(currentUser);

app.use(currentUserRouter);
app.use(authRouter);
new PeerServer(server, app).attach();
new SocketServer(server).attach();
app.all('*', async (_req, _res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app, server };
