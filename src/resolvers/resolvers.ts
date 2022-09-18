import { createLobby } from '../actions';
import { LobbyOptions } from '../types';
import queryResolvers from './queryResolvers';
import mutationResolvers from './mutationResolvers';

const DEFAULT_LOBBY_OPTIONS: LobbyOptions = {
	minPlayers: 2,
	maxPlayers: 4
};

// eslint-disable-next-line prefer-const
export const state = {
	lobby: createLobby(DEFAULT_LOBBY_OPTIONS)
};

const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
};

export default resolvers;