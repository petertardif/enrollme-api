import db from '../db';

const courseResolvers = {
	Query: {
		courses: async () => {
			try {
				const arrOfCourses = await db.query(`SELECT * FROM courses;`);
				return arrOfCourses.rows;
			} catch (e) {
				// tslint:disable-next-line:no-console
				console.log(e.stack);
			}
		},
		course: async (obj: any, args: any) => {
			try {
				const foundCourse = await db.query(
					`SELECT * FROM courses WHERE id = '${args.id}'`
				);
				return foundCourse.rows[0];
			} catch (e) {
				// tslint:disable-next-line:no-console
				console.log(e.stack);
			}
		},
	},
};

export default courseResolvers;
