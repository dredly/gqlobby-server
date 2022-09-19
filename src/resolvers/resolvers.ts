import { PubSub } from 'graphql-subscriptions';

import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';
import { subscriptionResolvers } from './subscriptionResolvers';

export const pubsub = new PubSub();

export const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Subscription: subscriptionResolvers
};
