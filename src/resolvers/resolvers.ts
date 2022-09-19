import { PubSub } from 'graphql-subscriptions';

import { Lobby } from '../types';
import { getQueryResolvers } from './queryResolvers';
import { getMutationResolvers } from './mutationResolvers';
import { subscriptionResolvers } from './subscriptionResolvers';

export const pubsub = new PubSub();

export const getResolvers = (lobby: Lobby) => {
	return {
		Query: getQueryResolvers(lobby),
		Mutation: getMutationResolvers(lobby),
		Subscription: subscriptionResolvers
	};
};
