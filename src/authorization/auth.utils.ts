import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const getUserWithEmail = async (db: any, email: string) => {
	try {
		const statement = 'SELECT * FROM users WHERE email = $1';
		const values = [email];
		const foundUser = await db.query(statement, values);

		return foundUser.rows[0];
	} catch (e) {
		console.log(e.stack);
	}
};

export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
};

export const createJwt = (subject: any, payload: any) => {
	return jwt.sign(payload, config.JWT_SECRET, {
		subject,
		algorithm: 'HS256',
	});
};

export const verifyJwt = (token: any) => {
	return jwt.verify(token, config.JWT_SECRET, {
		algorithms: ['HS256'],
	});
};
