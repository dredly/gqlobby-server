import { state } from './resolvers';
import { createPlayer as createPlayerAction } from '../actions';
import { createLobby as createLobbyAction } from '../actions';
import { createGame as createGameAction } from '../actions';
import { joinGame as joinGameAction } from '../actions';
import { toggleReady as toggleReadyAction } from '../actions';
import { startGame as startGameAction } from '../actions';
import { LobbyOptions } from '../types';

export const mutationResolvers = {
	createLobby: (_root: undefined, args: {minPlayers: number, maxPlayers: number}) => {
		const opts: LobbyOptions = {
			minPlayers: args.minPlayers,
			maxPlayers: args.maxPlayers
		};
		state.lobby = createLobbyAction(opts);
		return state.lobby;
	},
	createPlayer: (_root: undefined, args: {name: string}) => createPlayerAction(args.name, state.lobby),
	createGame: (_root: undefined, args: {playerID: string}) => createGameAction(args.playerID, state.lobby),
	joinGame: (_root: undefined, args: {gameID: string, playerID: string}) => (
		joinGameAction(args.gameID, args.playerID, state.lobby)
	),
	toggleReady: (_root: undefined, args: {playerID: string}) => toggleReadyAction(args.playerID, state.lobby),
	startGame: (_root: undefined, args: {gameID: string}) => startGameAction(args.gameID, state.lobby)
};