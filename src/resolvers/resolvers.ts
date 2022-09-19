import { PubSub } from 'graphql-subscriptions';

import { createLobby } from '../actions';
import { options } from '../options';
import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';
import { subscriptionResolvers } from './subscriptionResolvers';

export const lobby = createLobby(options.lobbyOptions);

export const pubsub = new PubSub();

export const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Subscription: subscriptionResolvers
};
