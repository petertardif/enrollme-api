import app from './index';
import cors from 'cors';
import PORT from './config';
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
app.use(cors());

app.listen(PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at http://localhost:4000${server.graphqlPath}`);
});
