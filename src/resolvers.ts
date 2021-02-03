import courserequestsResolvers from './courserequests/courserequests.resolvers';
import courseResolvers from './courses/courses.resolvers';
import highSchoolsResolvers from './highschools/highschools.resolvers';
import higherEdInstitutionsResolvers from './higherEdInstitutions/higheredInstitutions.resolvers';
import usersResolvers from './users/users.resolvers';

const resolvers = [
	courserequestsResolvers,
	courseResolvers,
	highSchoolsResolvers,
	higherEdInstitutionsResolvers,
	usersResolvers,
];

export default resolvers;
