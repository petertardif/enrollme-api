import { gql } from 'apollo-server-express';

const courserequestsTypeDefs = gql`
	enum AcademicTerm {
		FALL
		SPRING
		QUARTER_1
		QUARTER_2
		QUARTER_3
		QUARTER_4
		TRIMESTER_1
		TRIMESTER_2
		TRIMESTER_3
		FALL_ALT_TERM
		SPRING_ALT_TERM
		FALL_A_CSU_GLOBAL
		FALL_B_CSU_GLOBAL
		FALL_C_CSU_GLOBAL
		FALL_D_CSU_GLOBAL
		Winter_A_CSU_GLOBAL
		Winter_B_CSU_GLOBAL
		Winter_C_CSU_GLOBAL
		Winter_D_CSU_GLOBAL
		SPRING_A_CSU_GLOBAL
		SPRING_B_CSU_GLOBAL
		SPRING_C_CSU_GLOBAL
		SPRING_D_CSU_GLOBAL
	}

	enum CourseType {
		AT_HIGHSCHOOL
		HYBRID
		ONLINE
		AT_COLLEGE
	}

	enum InstructorType {
		DPS_TEACHER
		COLLEGE_VISITING_FACULTY
		DPS_HYBRID_INSTRUCTOR
	}

	type CourseRequest {
		id: ID!
		school_id: Int!
		course_id: Int!
		course_type: CourseType
		instructor_type: InstructorType
		instructor_id: Int
		school_year: Int!
		academic_term: AcademicTerm!
		period: String
		days: String
		times: String
		projected_enrollment: Int
		isDeleted: Boolean
		isActive: Boolean
		onWishlist: Boolean
		updatedAt: String
	}

	extend type Query {
		courserequests: [CourseRequest]
		courserequest(id: ID): CourseRequest
	}

	input CourseRequestInput {
		id: ID!
		school_id: Int!
		course_id: Int!
		course_type: String
		instructor_type: String
		instructor_id: Int
		school_year: Int!
		academic_term: String!
		period: String
		days: String
		times: String
		projected_enrollment: Int
	}

	extend type Mutation {
		createCourseRequest(
			school_id: Int!
			course_id: Int!
			course_type: String
			instructor_type: String
			instructor_id: Int
			school_year: Int!
			academic_term: String!
			period: String
			days: String
			times: String
			projected_enrollment: Int
		): [CourseRequest]
		updateCourseRequest(courserequest: CourseRequestInput): [CourseRequest]
		deleteCourseRequest(id: ID!): [CourseRequest]
		archiveCourseRequest(id: ID!): [CourseRequest]
		reactivateCourseRequest(id: ID!): [CourseRequest]
		addCourseRequestToWishlist(id: ID!): [CourseRequest]
	}
`;

export default courserequestsTypeDefs;
