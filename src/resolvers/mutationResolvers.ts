import { pubsub } from './resolvers';
import { state } from '../state';
const { lobby } = state;

import { createPlayer as createPlayerAction } from '../actions';
import { createGame as createGameAction } from '../actions';
import { joinGame as joinGameAction } from '../actions';
import { toggleReady as toggleReadyAction } from '../actions';
import { startGame as startGameAction } from '../actions';

export const mutationResolvers = {
	createPlayer: (_root: undefined, args: {name: string}) => createPlayerAction(args.name, lobby),
	createGame: (_root: undefined, args: {playerID: string}) => {
		const newGame = createGameAction(args.playerID, lobby);
		void pubsub.publish('GAME_ADDED', {gameAdded: newGame});
		return newGame;
	},
	joinGame: (_root: undefined, args: {gameID: string, playerID: string}) => {
		const joinedGame = joinGameAction(args.gameID, args.playerID, lobby);
		void pubsub.publish('GAME_UPDATED', {gameUpdated: joinedGame});
		return joinedGame;
	},
	toggleReady: (_root: undefined, args: {playerID: string}) =>  {
		const updatedGame = toggleReadyAction(args.playerID, lobby);
		void pubsub.publish('GAME_UPDATED', {gameUpdated: updatedGame});
		return updatedGame;
	},
	startGame: (_root: undefined, args: {playerID: string}) => {
		const startedGame = startGameAction(args.playerID, lobby);
		void pubsub.publish('GAME_STARTED', {gameStarted: startedGame});
		return startedGame;
	} 
};