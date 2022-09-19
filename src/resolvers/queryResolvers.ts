import { lobby } from './resolvers';

export const queryResolvers = {
	lobby: () => lobby,
	allGames: () => lobby.games,
	allPlayersNotJoined: () => lobby.playersNotJoined
};