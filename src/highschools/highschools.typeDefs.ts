import { gql } from 'apollo-server-express';

const highSchoolTypeDefs = gql`
	scalar Date

	enum Network {
		ASCENT
		CENTRAL
		CHARTER
		FAR_NORTHEAST
		INNOVATION_ZONE
		NEAR_NORTHEAST
		NORTHWEST
		SOUTHEAST
		SOUTHWEST
	}

	type HighSchool {
		id: ID!
		school_num: Int!
		school_name: String!
		network: Network
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
	}

	extend type Query {
		highSchools: [HighSchool]
		highSchool(id: ID): HighSchool
	}

	input HighSchoolInput {
		id: ID!
		school_num: Int!
		school_name: String!
		network: Network
		isDeleted: Boolean
		isActive: Boolean
		updatedAt: Date
	}

	extend type Mutation {
		createHighSchool(
			school_num: Int!
			school_name: String!
			network: Network
		): [HighSchool]
		updateHighSchool(highSchool: HighSchoolInput): [HighSchool]
		deleteHighSchool(id: ID!, updatedAt: Date): [HighSchool]
		reactivateHighSchool(id: ID!): [HighSchool]
	}
`;

export default highSchoolTypeDefs;
