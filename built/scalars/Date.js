"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("graphql/language");
const graphql_1 = require("graphql");
exports.default = new graphql_1.GraphQLScalarType({
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
        if (ast.kind === language_1.Kind.INT) {
            return new Date(ast.value);
        }
        return null;
    },
});
