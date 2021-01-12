"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const courseTypeDefs = apollo_server_express_1.gql `
	type Course {
		id: ID!
		course_code: Int!
		course_name: String!
	}

	type Query {
		courses: [Course]
	}
`;
exports.default = courseTypeDefs;
