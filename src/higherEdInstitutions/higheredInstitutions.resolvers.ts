import db from '../db';

const higherEdInstitutionsResolvers = {
	Query: {
		higherEdInstitutions: async (context: any) => {
			try {
				const statement =
					'SELECT * FROM higheredinstitutions WHERE isDeleted = false AND isActive = true';
				const arrOfHigherEdInstitutions = await db.query(statement);
				return arrOfHigherEdInstitutions.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		higherEdInstitution: async (obj: any, { id }: any, context: any) => {
			try {
				const statement = 'SELECT * FROM higheredinstitutions WHERE id = $1';
				const values = [`${id}`];
				const foundHigherEdInstitution = await db.query(statement, values);
				return foundHigherEdInstitution.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createHigherEdInstitution: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'INSERT INTO higheredinstitutions (name, institution_type,short_name, cde_number, cde_name, isCE, isDE) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
				const values = [
					`${args.name}`,
					args.institution_type,
					`${args.short_name}`,
					args.cde_number,
					`${args.cde_name}`,
					args.isCE,
					args.isDE,
				];
				const newHigherEdInstitution = await db.query(statement, values);
				return newHigherEdInstitution.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateHigherEdInstitution: async (
			obj: any,
			{ higherEdInstitution }: any,
			context: any
		) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE higheredinstitutions SET name = $1, institution_type = $2, short_name = $3, cde_number = $4, cde_name = $5, isCE = $6, isDE = $7, isDeleted = $8, isActive = $9, updatedAt = $10 WHERE id = $11 RETURNING *';
				const values = [
					`${higherEdInstitution.name}`,
					higherEdInstitution.institution_type,
					`${higherEdInstitution.short_name}`,
					higherEdInstitution.cde_number,
					`${higherEdInstitution.cde_name}`,
					higherEdInstitution.isCE,
					higherEdInstitution.isDE,
					higherEdInstitution.isDeleted,
					higherEdInstitution.isActive,
					updatedDate,
					higherEdInstitution.id,
				];
				const newHigherEdInstitution = await db.query(statement, values);
				return newHigherEdInstitution.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		deleteHigherEdInstitution: async (obj: any, { id }: any, context: any) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE higheredinstitutions SET isDeleted = true, isActive = false, updatedAt = $1 WHERE id = $2 RETURNING *';
				const values = [updatedDate, id];
				const newHigherEdInstitution = await db.query(statement, values);
				return newHigherEdInstitution.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		reactivateHigherEdInstitution: async (
			obj: any,
			{ id }: any,
			context: any
		) => {
			try {
				const updatedDate = new Date().toISOString();
				const statement =
					'UPDATE higheredinstitutions SET isDeleted = false, isActive = true, updatedAt = $1 WHERE id = $2 RETURNING *';
				const values = [updatedDate, id];
				const reactivatedHigherEdInstitution = await db.query(
					statement,
					values
				);
				return reactivatedHigherEdInstitution.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},
};

export default higherEdInstitutionsResolvers;
