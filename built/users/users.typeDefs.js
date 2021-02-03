"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const usersTypeDefs = apollo_server_express_1.gql `
	enum Role {
		SUPERUSER
		DISTRICT_ADMIN
		HS_ADMIN
		HS_INSTRUCTOR
		HIGHER_ED_INSTITUTION_ADMIN
		HIGHER_ED_INSTITUTION_INSTRUCTOR
		STUDENT
		PARENT
	}

	type User {
		id: ID!
		last_name: String!
		first_name: String!
		email: String!
		password: String!
		role: Role!
		school_id: Int
		higheredinstitution_id: Int
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
		highschools: [HighSchool]
		higherEdInstitutions: [HigherEdInstitution]
	}

	extend type Query {
		users: [User]
		user(id: ID): User
	}

	input UserInput {
		id: ID!
		last_name: String
		first_name: String
		email: String
		password: String
		role: Role
		school_id: Int
		higheredinstitution_id: Int
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
	}

	extend type Mutation {
		createUser(
			last_name: String!
			first_name: String!
			email: String!
			password: String!
			role: Role!
			school_id: Int
			higheredinstitution_id: Int
		): [User]
		updateUser(user: UserInput): [User]
		deleteUser(id: ID!): [User]
		reactivateUser(id: ID!): [User]
	}
`;
exports.default = usersTypeDefs;
