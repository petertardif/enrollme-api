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

export const validatePassword = (password: string) => {
	const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
	if (password.length < 8) {
		return 'Password must be longer than 8 characters';
	}
	if (password.length > 72) {
		return 'Password must be less than 72 characters';
	}
	if (password.startsWith(' ') || password.endsWith(' ')) {
		return 'Password must not start or end with empty spaces';
	}
	if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
		return 'Password must contain 1 uppercase letter, 1 lowercase letter, a number and a special character';
	}
	return null;
};
