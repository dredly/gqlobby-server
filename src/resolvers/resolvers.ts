import { PubSub } from 'graphql-subscriptions';

import { createLobby } from '../actions';
import { LobbyOptions } from '../types';
import { queryResolvers } from './queryResolvers';
import { mutationResolvers } from './mutationResolvers';
import { subscriptionResolvers } from './subscriptionResolvers';

const DEFAULT_LOBBY_OPTIONS: LobbyOptions = {
	minPlayers: 2,
	maxPlayers: 4
};

// eslint-disable-next-line prefer-const
export const state = {
	lobby: createLobby(DEFAULT_LOBBY_OPTIONS)
};

export const pubsub = new PubSub();

export const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
	Subscription: subscriptionResolvers
};
