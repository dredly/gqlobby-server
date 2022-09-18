import { state } from './resolvers';

export const queryResolvers = {
	lobby: () => state.lobby,
	allGames: () => state.lobby.games,
	allPlayersNotJoined: () => state.lobby.playersNotJoined
};