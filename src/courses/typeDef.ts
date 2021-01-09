import { gql } from 'apollo-server-express';

const courseTypeDefs = gql`
	type Course {
		id: ID!
		course_code: Int!
		course_name: String!
	}

	type Query {
		courses: [Course]
	}
`;

export default courseTypeDefs;
