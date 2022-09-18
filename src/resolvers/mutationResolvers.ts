import { state } from './resolvers';
import { createPlayer as createPlayerAction } from '../actions';
import { createLobby as createLobbyAction } from '../actions';
import { createGame as createGameAction } from '../actions';
import { LobbyOptions } from '../types';

const mutationResolvers = {
	createLobby: (_root: undefined, args: {lobbyOptions: LobbyOptions}) => {
		state.lobby = createLobbyAction(args.lobbyOptions);
		return state.lobby;
	},
	createPlayer: (_root: undefined, args: {name: string}) => createPlayerAction(args.name, state.lobby),
	createGame: (_root: undefined, args: {playerID: string}) => createGameAction(args.playerID, state.lobby)
};

export default mutationResolvers;