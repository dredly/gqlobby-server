import { Lobby } from '../types';

export const getQueryResolvers = (lobby: Lobby) => {
	return {
		lobby: () => lobby,
		allGames: () => lobby.games,
		allPlayersNotJoined: () => lobby.playersNotJoined
	};
};
