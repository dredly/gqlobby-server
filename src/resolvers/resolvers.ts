import { createLobby } from '../actions';
import { LobbyOptions } from '../types';

const DEFAULT_LOBBY_OPTIONS: LobbyOptions = {
	minPlayers: 2,
	maxPlayers: 4
};

const lobby = createLobby(DEFAULT_LOBBY_OPTIONS);

const resolvers = {
	Query: {
		gameCount: () => lobby.games.length
	}
};

export default resolvers;