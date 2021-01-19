import courseResolvers from './courses/courses.resolvers';
import highSchoolsResolvers from './highschools/highschools.resolvers';
import higherEdInstitutionsResolvers from './higherEdInstitutions/higheredInstitutions.resolvers';

const resolvers = [
	courseResolvers,
	highSchoolsResolvers,
	higherEdInstitutionsResolvers,
];

export default resolvers;
