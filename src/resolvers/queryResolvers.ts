import { state } from '../state';
const { lobby } = state;

export const queryResolvers = {
	lobby: () => lobby,
	allGames: () => lobby.games,
	allPlayersNotJoined: () => lobby.playersNotJoined
};