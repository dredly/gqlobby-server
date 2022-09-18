import { state } from './resolvers';
import { createPlayer as createPlayerAction } from '../actions';
import { createLobby as createLobbyAction } from '../actions';
import { LobbyOptions } from '../types';

const mutationResolvers = {
	createLobby: (_root: undefined, args: {lobbyOptions: LobbyOptions}) => {
		state.lobby = createLobbyAction(args.lobbyOptions);
		return state.lobby;
	},
	createPlayer: (_root: undefined, args: {name: string}) => createPlayerAction(args.name, state.lobby)
};

export default mutationResolvers;