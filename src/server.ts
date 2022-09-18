import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import http from 'http';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers/resolvers';

const start = async () => {
	const app = express();
	const httpServer = http.createServer(app);
	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const wsServer = new WebSocketServer({
		// This is the `httpServer` returned by createServer(app);
		server: httpServer,
		// Pass a different path here if your ApolloServer serves at
		// a different path.
		path: '/graphql',
	});

	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			// Proper shutdown for the WebSocket server.
			{
				// eslint-disable-next-line @typescript-eslint/require-await
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						},
					};
				},
			},
		],
	});

	await server.start();

	server.applyMiddleware({
		app,
		path: '/',
	});

	const PORT = 4000;

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	);
};

export default start;

