"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const courserequestsTypeDefs = apollo_server_express_1.gql `
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
		higheredinstitution_id: Int!
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
		highschools: [HighSchool]
		higherEdInstitutions: [HigherEdInstitution]
		courses: [Course]
		instructors: [User]
	}

	extend type Query {
		courserequests: [CourseRequest]
		courserequest(id: ID): CourseRequest
	}

	input CourseRequestInput {
		id: ID!
		higheredinstitution_id: Int!
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
	}

	extend type Mutation {
		createCourseRequest(
			higheredinstitution_id: Int!
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
		): [CourseRequest]
		updateCourseRequest(courserequest: CourseRequestInput): [CourseRequest]
		deleteCourseRequest(id: ID!): [CourseRequest]
		archiveCourseRequest(id: ID!): [CourseRequest]
		reactivateCourseRequest(id: ID!): [CourseRequest]
		addCourseRequestToWishlist(id: ID!): [CourseRequest]
	}
`;
exports.default = courserequestsTypeDefs;
