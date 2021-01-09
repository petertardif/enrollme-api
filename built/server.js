"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
    playground: true,
});
server.applyMiddleware({ app: index_1.default });
index_1.default.use(cors_1.default());
index_1.default.listen(config_1.default, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at http://localhost:4000${server.graphqlPath}`);
});
