"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const courseTypeDefs = apollo_server_express_1.gql `
	type Course {
		id: ID!
		course_code: Int!
		course_name: String!
		course_desc: String
		course_level: String
		college_credits: Int!
		department: String
		hs_credits: Float
		hs_department: String
		culturally_relevant: Boolean
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: String
	}

	type Query {
		courses: [Course]
		course(id: ID): Course
	}

	input CourseInput {
		id: ID!
		course_code: Int
		course_name: String
		course_desc: String
		course_level: String
		college_credits: Int
		department: String
		hs_credits: Float
		hs_department: String
		culturally_relevant: Boolean
	}

	type Mutation {
		createCourse(
			course_code: Int!
			course_name: String!
			course_desc: String
			course_level: String
			college_credits: Int!
			department: String
			hs_credits: Float
			hs_department: String
			culturally_relevant: Boolean
		): [Course]
		updateCourse(course: CourseInput): [Course]
		deleteCourse(id: ID!): [Course]
		reactivateCourse(id: ID!): [Course]
	}
`;
exports.default = courseTypeDefs;
