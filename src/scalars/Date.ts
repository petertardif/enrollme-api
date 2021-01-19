import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';

export default new GraphQLScalarType({
	name: 'ISODate',
	description: `Date custom scalar type`,
	parseValue(value) {
		// value from the client
		return new Date(value);
	},
	serialize(value) {
		// value sent to the client
		return value.getTime();
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}
		return null;
	},
});
