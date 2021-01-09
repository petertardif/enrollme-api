import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
// const { NODE_ENV } = require('./config');
import NODE_ENV from './config';

const app = express();
dotenv.config();

// TODO: turn contentSecurityPolicy back on in production.
app.use(helmet({ contentSecurityPolicy: false }));

app.get('/', (req, res) => {
	res.send('Hello Ms. World!');
});

app.use(function errorHandler(error: any, req: Request, res: Response) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		// tslint:disable-next-line:no-console
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

export default app;
