import { Lobby, Player, Game, GameMode } from './types';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';
import every from 'lodash.every';

/*
Trying to follow functional programming principals where possible, so only the lobby can be mutated
Likewise, the only side effect these functions can have is to update the lobby

Example 
lobby.games = newGames is ok
lobby.games.push(newGame) is not
*/

const cd = cloneDeep;

export const createLobby = (gameModes: GameMode[]): Lobby => {
	// Creates a lobby object

	//TODO: check that all gameModes are valid
	return {
		games: [],
		playersNotJoined: [],
		gameModes
	};
};

export const createPlayer = (name: string, lobby: Lobby): Player => {
	// Creates a player. Adds the player to the playersNotJoined array in the lobby
	// as a side effect. Returns the created player
	const createdPlayer: Player = {
		id: uuidv4(),
		name,
		ready: false
	};
	lobby.playersNotJoined = lobby.playersNotJoined.concat(createdPlayer);
	return createdPlayer;
}; 

export const createGame = (creatorId: string, lobby: Lobby): Game => {
	// Creates a game. Adds the game to the games array in the lobby as a side
	// effect. Returns the created game
	const creator = lobby.playersNotJoined.find(p => p.id === creatorId);
	if (!creator) {
		throw new Error('A player with that id was not found');
	}
	const createdGame: Game = {
		id: uuidv4(),
		status: 'NOT_STARTED',
		players: [creator]
	};
	lobby.games = lobby.games.concat(createdGame);
	lobby.playersNotJoined = lobby.playersNotJoined
		.filter(p => p.id !== creatorId);
	return createdGame;
};

export const joinGame = (gameId: string, playerId: string, lobby: Lobby): Game => {
	// Moves a player from the playersNotJoined array into the players array of the given
	// game as a side effect. Returns the updated game
	const game = lobby.games.find(g => g.id === gameId);
	if (!game) {
		throw new Error('A game with that id was not found');
	}
	if (game.players.length === lobby.lobbyOptions.maxPlayers) {
		throw new Error('Cannot join that game as it is already full');
	}
	const player = lobby.playersNotJoined.find(p => p.id === playerId);
	if (!player) {
		throw new Error('A player with that id was not found');
	}

	const updatedGame = { ...cd(game), players: game.players.concat(player) };

	lobby.games = lobby.games.map(g => g.id === gameId ? updatedGame : g);
	lobby.playersNotJoined = lobby.playersNotJoined
		.filter(p => p.id !== playerId);

	return updatedGame;
};

export const toggleReady = (playerId: string, lobby: Lobby): Game => {
	// Sets the player's ready attribute to the opposite of what it was before
	const game = lobby.games.find(g => g.players.map(p => p.id).includes(playerId));
	if (!game) {
		throw new Error('A game containing that player was not found');
	}
	const updatedGame = { 
		...cd(game), 
		players: game.players.map(p => p.id === playerId ? {...p, ready: !p.ready} : p) 
	};
	console.log('updatedGame', updatedGame);
	lobby.games = lobby.games.map(g => g.id === updatedGame.id ? updatedGame : g);
	return updatedGame;
};

export const startGame = (playerId: string, lobby: Lobby): Game => {
	const game = lobby.games.find(g => g.players.map(p => p.id).includes(playerId));
	if (!game) {
		throw new Error('A game containing that player was not found');
	}
	if (!(playerId === game.players[0].id)) {
		throw new Error('Only the creator of the game can start it');
	}
	const allReady = every(game.players.map(p => p.ready));
	if (!allReady) {
		throw new Error('Players must all be ready to start game');
	}
	if (game.players.length < lobby.lobbyOptions.minPlayers) {
		throw new Error('Not enough players to start game');
	}

	const updatedGame: Game = {
		...cd(game),
		status: 'IN_PROGRESS'
	};

	lobby.games = lobby.games.map(g => g.id === game.id ? updatedGame : g);
	return updatedGame;
};

export const endGame = (gameId: string, lobby: Lobby): Game => {
	const game = lobby.games.find(g => g.id === gameId);
	if (!game) {
		throw new Error('A game with that id was not found');
	}
	if (!(game.status === 'IN_PROGRESS')) {
		throw new Error('Only games in progress can be ended');
	}
	const endedGame: Game = {
		...cd(game),
		status: 'FINISHED'
	};

	lobby.games = lobby.games.map(g => g.id === gameId ? endedGame : g);
	return endedGame;
};

export const removeGame = (gameId: string, lobby: Lobby): Game => {
	const game = lobby.games.find(g => g.id === gameId);
	if (!game) {
		throw new Error('A game with that id was not found');
	}
	lobby.games = lobby.games.filter(g => g.id !== gameId);
	return game;
};