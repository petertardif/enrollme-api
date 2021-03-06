import db from '../db';
import xss from 'xss';

const courseResolvers = {
	Query: {
		courses: async (context: any) => {
			try {
				const statement =
					'SELECT * FROM courses WHERE isActive = true AND isDeleted = false';
				const arrOfCourses = await db.query(statement);
				return arrOfCourses.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		course: async (obj: any, args: any, context: any) => {
			try {
				const foundCourse = await db.query(
					`SELECT * FROM courses WHERE id = '${args.id}';`
				);
				return foundCourse.rows[0];
			} catch (e) {
				console.log(e.stack);
			}
		},
	},

	Mutation: {
		createCourse: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'INSERT INTO courses (course_code,course_name,course_desc, course_level, college_credits, department, hs_credits, hs_department, culturally_relevant) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';
				const values = [
					`${args.course_code}`,
					xss(`${args.course_name}`),
					xss(`${args.course_desc}`),
					xss(`${args.course_level}`),
					`${args.college_credits}`,
					xss(`${args.department}`),
					`${args.hs_credits}`,
					xss(`${args.hs_department}`),
					`${args.culturally_relevant}`,
				];
				const newCourse = await db.query(statement, values);
				return newCourse.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		updateCourse: async (obj: any, { course }: any, context: any) => {
			try {
				const updatedDate = new Date().toISOString();

				const statement =
					'UPDATE courses SET course_code = $1, course_name = $2, course_desc = $3, course_level = $4, college_credits = $5, department = $6, hs_credits = $7, hs_department = $8, culturally_relevant = $9, updatedAt = $10 WHERE id = $11 RETURNING *';

				const values = [
					course.course_code,
					xss(`${course.course_name}`),
					xss(`${course.course_desc}`),
					xss(`${course.course_level}`),
					course.college_credits,
					xss(`${course.department}`),
					course.hs_credits,
					xss(`${course.hs_department}`),
					course.culturally_relevant,
					updatedDate,
					course.id,
				];

				const updateCourse = await db.query(statement, values);
				console.log(values);
				return updateCourse.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		deleteCourse: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courses SET isDeleted = true, isActive = false WHERE id = $1 RETURNING *';
				const values = [args.id];
				const deletedCourse = await db.query(statement, values);
				return deletedCourse.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
		reactivateCourse: async (obj: any, args: any, context: any) => {
			try {
				const statement =
					'UPDATE courses SET isDeleted = false, isActive = true WHERE id = $1 RETURNING *';
				const values = [args.id];
				const reactivatedCourse = await db.query(statement, values);
				return reactivatedCourse.rows;
			} catch (e) {
				console.log(e.stack);
			}
		},
	},
};

export default courseResolvers;
