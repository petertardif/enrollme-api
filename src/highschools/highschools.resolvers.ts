import db from '../db';
import xss from 'xss';

const highSchoolsResolvers = {
	Query: {
		highSchools: async (context: any) => {
			try {
				const statement =
					'SELECT * FROM highschools WHERE isActive = true and isDeleted = false';
				const arrOfHighSchools = await db.query(statement);
				return arrOfHighSchools.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		highSchool: async (obj: any, { id }: { id: number }, context: any) => {
			try {
				const statement = 'SELECT * FROM highschools WHERE id = $1';
				const values = [`${id}`];
				const foundHighSchool = await db.query(statement, values);
				return foundHighSchool.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createHighSchool: async (
			obj: any,
			args: { school_num: number; school_name: string; network: string },
			context: any
		) => {
			try {
				const statement =
					'INSERT INTO highschools (school_num, school_name, network) VALUES ($1,$2,$3) RETURNING *';
				const values = [
					args.school_num,
					xss(`${args.school_name}`),
					args.network,
				];
				const newHighSchool = await db.query(statement, values);
				return newHighSchool.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateHighSchool: async (obj: any, { highSchool }: any, context: any) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE highschools SET school_num = $1, school_name = $2, network = $3, isDeleted = $4, isActive = $5, updatedAt = $6 WHERE id = $7 RETURNING *';
				const values = [
					highSchool.school_num,
					xss(`${highSchool.school_name}`),
					highSchool.network,
					highSchool.isDeleted,
					highSchool.isActive,
					updatedDate,
					highSchool.id,
				];
				const updatedHighSchool = await db.query(statement, values);
				return updatedHighSchool.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		deleteHighSchool: async (obj: any, { id }: any, context: any) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE highschools SET isDeleted = true, isActive = false, updatedAt = $1 WHERE id = $2 RETURNING *';
				const values = [updatedDate, id];
				const deletedHighSchool = await db.query(statement, values);
				return deletedHighSchool.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		reactivateHighSchool: async (obj: any, { id }: any, context: any) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE highschools SET isDeleted = false, isActive = true, updatedAt = $1 WHERE id = $2 RETURNING *';
				const values = [updatedDate, id];
				const reactivatedHighSchool = await db.query(statement, values);
				return reactivatedHighSchool.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},
};

export default highSchoolsResolvers;
