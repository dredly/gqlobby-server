import { GameStatus, Lobby } from '../types';

export const getQueryResolvers = (lobby: Lobby) => {
	return {
		lobby: () => lobby,
		allGames: (_root: undefined, args: {gameStatus?: GameStatus}) => {
			if (!args.gameStatus) {
				return lobby.games;
			}
			return lobby.games.filter(g => g.status === args.gameStatus);
		},
		allPlayersNotJoined: () => lobby.playersNotJoined,
		gameById: (_root: undefined, args: {gameID: string}) => {
			const foundGame = lobby.games.find(g => g.id === args.gameID);
			if (!foundGame) {
				throw new Error('A game with that id was not found');
			}
			return foundGame;
		},
		gameExists: (_root: undefined, args: {gameID: string}) => {
			const game = lobby.games.find(g => g.id === args.gameID);
			return game ? true : false;
		}
	};
};
