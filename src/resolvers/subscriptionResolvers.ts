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
	gameEnded: {
		subscribe: () => pubsub.asyncIterator(['GAME_ENDED'])
	},
	gameRemoved: {
		subscribe: () => pubsub.asyncIterator(['GAME_REMOVED'])
	}
};