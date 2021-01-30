import bcrypt from 'bcryptjs';
import db from '../db';
import xss from 'xss';

const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 12);
};

const usersResolvers = {
	Query: {
		users: async (context: any) => {
			try {
				const statement =
					'SELECT * FROM users WHERE isDeleted = false AND isActive = true';
				const arrOfUsers = await db.query(statement);
				return arrOfUsers.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		user: async (obj: any, { id }: any, context: any) => {
			try {
				const statement = 'SELECT * FROM users WHERE id = $1';
				const values = [id];
				const foundUser = await db.query(statement, values);
				return foundUser.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createUser: async (obj: any, args: any, context: any) => {
			try {
				const cleanedPass = xss(`${args.password}`);
				const hashedPass = await hashPassword(cleanedPass);
				const statement =
					'INSERT INTO users (last_name, first_name, email, password, role, school_id, higheredinstitution_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
				const values = [
					xss(`${args.last_name}`),
					xss(`${args.first_name}`),
					xss(`${args.email}`),
					hashedPass,
					xss(`${args.role}`),
					args.school_id,
					args.higheredinstitution_id,
				];
				const newUser = await db.query(statement, values);
				return newUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateUser: async (obj: any, { user }: any, context: any) => {
			try {
				const cleanedPass = xss(`${user.password}`);
				const hashedPass = await hashPassword(cleanedPass);
				const statement =
					'UPDATE users SET last_name = $1, first_name = $2, email = $3, password = $4, role = $5, school_id = $6, higheredinstitution_id = $7 WHERE id = $8 RETURNING *';
				const values = [
					xss(`${user.last_name}`),
					xss(`${user.first_name}`),
					xss(`${user.email}`),
					hashedPass,
					xss(`${user.role}`),
					user.school_id,
					user.higheredinstitution_id,
					user.id,
				];
				const updateUser = await db.query(statement, values);
				return updateUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		deleteUser: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE users SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
				const values = [args.id];
				const deleteUser = await db.query(statement, values);
				return deleteUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		reactivateUser: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE users SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
				const values = [args.id];
				const reactivatedUser = await db.query(statement, values);
				return reactivatedUser.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	User: {
		highschools: async (obj: any, args: any, context: any) => {
			try {
				const statement = `SELECT * FROM highschools WHERE id = $1`;
				const values = [`${obj.school_id}`];
				const schools = await db.query(statement, values);
				return schools.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		higherEdInstitutions: async (obj: any, args: any, context: any) => {
			try {
				const statement = `SELECT * FROM higheredinstitutions WHERE id = $1`;
				const values = [`${obj.higheredinstitution_id}`];
				const foundHigherEdInstitutions = await db.query(statement, values);
				return foundHigherEdInstitutions.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},
};

export default usersResolvers;
