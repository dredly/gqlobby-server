import { pubsub } from './resolvers';

export const subscriptionResolvers = {
	gameAdded: {
		subscribe: () => pubsub.asyncIterator(['GAME_ADDED'])
	},
	gameUpdated: {
		subscribe: () => pubsub.asyncIterator(['GAME_UPDATED'])
	},
	gameStarted: {
		subscribe: () => pubsub.asyncIterator(['GAME_STARTED'])
	},
};