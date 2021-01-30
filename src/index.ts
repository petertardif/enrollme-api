import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import authRouter from './authorization/auth.router';

const app = express();
dotenv.config();

// TODO: turn contentSecurityPolicy back on in production.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello Ms. World!');
});

app.use('/api/authentication', authRouter);

// TODO: set up error handling and logging with Winston
// app.use(function errorHandler(error: any, req: Request, res: Response) {
// 	let response;
// 	if (process.env.NODE_ENV === 'production') {
// 		response = { error: { message: 'server error' } };
// 	} else {
// 		// tslint:disable-next-line:no-console
// 		console.error(error);
// 		response = { message: error.message, error };
// 	}
// 	res.status(500).json(response);
// });

export default app;
