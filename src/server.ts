import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import http from 'http';
import { typeDefs } from './typeDefs';
import { getResolvers } from './resolvers/resolvers';
import { ServerOptions } from './types';
import { createLobby } from './actions';
import { DEFAULT_GAME_MODES } from './constants';
import { mergeSchemas } from '@graphql-tools/schema';

export const startLobbyServer = async (serverOptions?: ServerOptions) => {
	const app = express();
	const httpServer = http.createServer(app);

	const gameModes = serverOptions?.gameModes
		? serverOptions.gameModes
		: DEFAULT_GAME_MODES;

	const lobby = createLobby(
		serverOptions?.lobbyOptions ? serverOptions.lobbyOptions : DEFAULT_LOBBY_OPTIONS
	);

	const lobbySchema = makeExecutableSchema({ typeDefs, resolvers: getResolvers(lobby) });

	const schema = serverOptions?.schema 
		? mergeSchemas({ schemas: [lobbySchema, serverOptions.schema] }) 
		: lobbySchema;

	const wsServer = new WebSocketServer({
		// This is the `httpServer` returned by createServer(app);
		server: httpServer,
		// Pass a different path here if your ApolloServer serves at
		// a different path.
		path: '',
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
		cache: 'bounded'
	});

	await server.start();

	server.applyMiddleware({
		app,
		path: '/',
	});

	const PORT = serverOptions?.port ? serverOptions.port : 4000;

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	);
};
