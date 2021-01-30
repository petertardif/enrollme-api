"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const higherEdInstitutionsTypeDefs = apollo_server_express_1.gql `
	enum InstitutionType {
		COMMMUNITY_COLLEGE
		UNIVERSITY
		TECHNICAL
		COLLEGE
	}

	type HigherEdInstitution {
		id: ID!
		name: String!
		institution_type: InstitutionType
		short_name: String
		cde_number: Int
		cde_name: String
		isCE: Boolean
		isDE: Boolean
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
	}

	extend type Query {
		higherEdInstitutions: [HigherEdInstitution]
		higherEdInstitution(id: ID): HigherEdInstitution
	}

	input HigherEdInput {
		id: ID!
		name: String!
		institution_type: InstitutionType
		short_name: String
		cde_number: Int
		cde_name: String
		isCE: Boolean!
		isDE: Boolean!
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
	}

	extend type Mutation {
		createHigherEdInstitution(
			name: String!
			institution_type: InstitutionType!
			short_name: String
			cde_number: Int
			cde_name: String
			isCE: Boolean!
			isDE: Boolean!
		): [HigherEdInstitution]
		updateHigherEdInstitution(
			higherEdInstitution: HigherEdInput
		): [HigherEdInstitution]
		deleteHigherEdInstitution(id: ID!): [HigherEdInstitution]
		reactivateHigherEdInstitution(id: ID!): [HigherEdInstitution]
	}
`;
exports.default = higherEdInstitutionsTypeDefs;
