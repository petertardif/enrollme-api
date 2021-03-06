import app from './index';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
});

server.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at http://localhost:4000${server.graphqlPath}`);
});
