import { LobbyOptions, Lobby, Player, Game } from "./types";
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';

/*
Trying to follow functional programming principals where possible, so only the lobby can be mutated
Likewise, the only side effect these functions can have is to update the lobby
*/

const cd = cloneDeep;

export const createLobby = (lobbyOptions: LobbyOptions): Lobby => {
    // Creates a lobby object

    if (lobbyOptions.maxPlayers < lobbyOptions.minPlayers) {
        throw new Error('maxPlayers must be greater or equal than minPlayers');
    }
    return {
        games: [],
        playersNotJoined: [],
        lobbyOptions
    }
}

export const createPlayer = (name: string, lobby: Lobby): Player => {
    // Creates a player. Adds the player to the playersNotJoined array in the lobby
    // as a side effect. Returns the created player
    const createdPlayer: Player = {
        id: uuidv4(),
        name,
        ready: false
    }
    lobby.playersNotJoined = lobby.playersNotJoined.concat(createdPlayer);
    return createdPlayer;
} 

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
    }
    lobby.games = lobby.games.concat(createdGame);
    lobby.playersNotJoined = lobby.playersNotJoined
        .filter(p => p.id !== creatorId)
    return createdGame;
}

export const joinGame = (gameId: string, playerId: string, lobby: Lobby): Game => {
    // Moves a player from the playersNotJoined array into the players array of the given
    // game as a side effect. Returns the updated game
    const game = lobby.games.find(g => g.id === gameId);
    if (!game) {
        throw new Error('A game with that id was not found')
    }
    const player = lobby.playersNotJoined.find(p => p.id === playerId);
    if (!player) {
        throw new Error('A player with that id was not found');
    }

    const updatedGame = { ...cd(game), players: game.players.concat(player) }

    lobby.games = lobby.games.map(g => g.id === gameId ? updatedGame : g)
    lobby.playersNotJoined = lobby.playersNotJoined
        .filter(p => p.id !== playerId)

    return updatedGame
}

export const toggleReady = (playerId: string, lobby: Lobby): void => {
    // Sets the player's ready attribute to the opposite of what it was before
    const game = lobby.games.find(g => g.players.map(p => p.id).includes(playerId));
    if (!game) {
        throw new Error('Game not found')
    }
    const updatedGame = { 
        ...cd(game), 
        players: game.players.filter(p => p.id === playerId ? {...p, ready: !p.ready} : p) 
    }
    lobby.games = lobby.games.map(g => g.id === updatedGame.id ? updatedGame : g)
}