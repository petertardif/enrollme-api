import express from 'express';
import { getUserWithEmail, comparePasswords, createJwt } from './auth.utils';
import db from '../db';
const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post('/login', jsonBodyParser, (req, res, next) => {
	const { email, password } = req.body;
	const loginUser = { email, password };

	for (const [key, value] of Object.entries(loginUser))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`,
			});

	getUserWithEmail(db, loginUser.email)
		.then((dbUser: any) => {
			if (!dbUser)
				return res.status(400).json({
					error: 'Incorrect username or password',
				});

			return comparePasswords(loginUser.password, dbUser.password).then(
				(compareMatch: any) => {
					if (!compareMatch)
						return res.status(400).json({
							error: 'Incorrect username or password',
						});

					const sub = dbUser.email;
					const payload = { id: dbUser.id };
					res.send({
						authToken: createJwt(sub, payload),
						id: dbUser.id,
						last_name: dbUser.last_name,
						first_name: dbUser.first_name,
						email: dbUser.email,
						role: dbUser.role,
						school_id: dbUser.school_id,
						higheredinstitution_id: dbUser.higheredinstitution_id,
					});
				}
			);
		})
		.catch(next);
});

export default authRouter;
