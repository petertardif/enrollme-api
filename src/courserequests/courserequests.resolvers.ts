import db from '../db';
import xss from 'xss';
import highschools from '../users/users.resolvers';
import higherEdInstitutions from '../users/users.resolvers';

const courserequestsResolvers = {
	Query: {
		courserequests: async (context: any) => {
			try {
				const statement =
					'SELECT * FROM courserequests WHERE isDeleted = false AND isActive = true';
				const arrOfRequests = await db.query(statement);
				return arrOfRequests.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		courserequest: async (obj: any, { id }: any, context: any) => {
			try {
				const statement = 'SELECT * FROM courserequests WHERE id = $1';
				const values = [id];
				const foundRequest = await db.query(statement, values);
				return foundRequest.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createCourseRequest: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'INSERT INTO courserequests (higheredinstitution_id, school_id, course_id, course_type, instructor_type, instructor_id, school_year, academic_term, period, days, times, projected_enrollment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12) RETURNING *';
				const values = [
					args.higheredinstitution_id,
					args.school_id,
					args.course_id,
					xss(`${args.course_type}`),
					xss(`${args.instructor_type}`),
					args.instructor_id,
					xss(`${args.school_year}`),
					xss(`${args.academic_term}`),
					xss(`${args.period}`),
					xss(`${args.days}`),
					xss(`${args.times}`),
					xss(`${args.projected_enrollment}`),
				];
				const createdRequest = await db.query(statement, values);
				return createdRequest.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateCourseRequest: async (
			obj: any,
			{ courserequest }: any,
			context: any
		) => {
			try {
				const statement =
					'UPDATE courserequests SET higheredinstitution_id = $1, school_id = $2, course_id = $3, course_type = $4, instructor_type = $5, instructor_id = $6, school_year = $7, academic_term = $8, period = $9, days = $10, times = $11, projected_enrollment = $12 WHERE id = $13 RETURNING *';
				const values = [
					courserequest.higheredinstitution_id,
					courserequest.school_id,
					courserequest.course_id,
					xss(`${courserequest.course_type}`),
					xss(`${courserequest.instructor_type}`),
					courserequest.instructor_id,
					xss(`${courserequest.school_year}`),
					xss(`${courserequest.academic_term}`),
					xss(`${courserequest.period}`),
					xss(`${courserequest.days}`),
					xss(`${courserequest.times}`),
					xss(`${courserequest.projected_enrollment}`),
					courserequest.id,
				];
				const updatedCourseRequest = await db.query(statement, values);
				return updatedCourseRequest.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		deleteCourseRequest: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courserequests SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
				const values = [args.id];
				const deletedCourseRequest = await db.query(statement, values);
				return deletedCourseRequest.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		archiveCourseRequest: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courserequests SET isDeleted = false, isActive = false WHERE id = $1 RETURNING *';
				const values = [args.id];
				const archivedCourseRequest = await db.query(statement, values);
				return archivedCourseRequest.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		reactivateCourseRequest: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courserequests SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
				const values = [args.id];
				const reactivatedCourseRequest = await db.query(statement, values);
				return reactivatedCourseRequest.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		addCourseRequestToWishlist: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courserequests SET isDeleted = false, isActive = false, onWishlist = true WHERE id = $1 RETURNING *';
				const values = [args.id];
				const sentToWishList = await db.query(statement, values);
				return sentToWishList.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	User: {
		highschools,
		higherEdInstitutions,
	},
};

export default courserequestsResolvers;
