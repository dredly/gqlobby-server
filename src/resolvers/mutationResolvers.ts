import { pubsub } from './resolvers';

import { createPlayer as createPlayerAction } from '../actions';
import { createGame as createGameAction } from '../actions';
import { joinGame as joinGameAction } from '../actions';
import { toggleReady as toggleReadyAction } from '../actions';
import { startGame as startGameAction } from '../actions';
import { endGame as endGameAction } from '../actions';
import { removeGame as removeGameAction } from '../actions';
import { Lobby } from '../types';

export const getMutationResolvers = (lobby: Lobby) => {
	return {
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
		toggleReady: (_root: undefined, args: {playerID: string}) => {
			const updatedGame = toggleReadyAction(args.playerID, lobby);
			void pubsub.publish('GAME_UPDATED', {gameUpdated: updatedGame});
			return updatedGame;
		},
		startGame: (_root: undefined, args: {playerID: string}) => {
			const startedGame = startGameAction(args.playerID, lobby);
			void pubsub.publish('GAME_STARTED', {gameStarted: startedGame});
			return startedGame;
		},
		endGame: (_root: undefined, args: {gameID: string}) => {
			const endedGame = endGameAction(args.gameID, lobby);
			void pubsub.publish('GAME_ENDED', {gameEnded: endedGame});
			return endedGame;
		},
		removeGame: (_root: undefined, args: {gameID: string}) => {
			const removedGame = removeGameAction(args.gameID, lobby);
			void pubsub.publish('GAME_REMOVED', {gameRemoved: removedGame});
			return removedGame;
		}
	};
}; 