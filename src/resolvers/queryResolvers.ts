import { state } from './resolvers';

const queryResolvers = {
	lobby: () => state.lobby,
	allGames: () => state.lobby.games,
	allPlayersNotJoined: () => state.lobby.playersNotJoined
};

export default queryResolvers;