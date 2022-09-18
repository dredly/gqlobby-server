"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGame = exports.toggleReady = exports.joinGame = exports.createGame = exports.createPlayer = exports.createLobby = void 0;
var uuid_1 = require("uuid");
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var lodash_every_1 = __importDefault(require("lodash.every"));
/*
Trying to follow functional programming principals where possible, so only the lobby can be mutated
Likewise, the only side effect these functions can have is to update the lobby
*/
var cd = lodash_clonedeep_1.default;
// Create lobby function is called once on server startup. If it is called after that, it replaces the old lobby with a new lobby
var createLobby = function (lobbyOptions) {
    // Creates a lobby object
    if (lobbyOptions.maxPlayers < lobbyOptions.minPlayers) {
        throw new Error('maxPlayers must be greater or equal than minPlayers');
    }
    return {
        games: [],
        playersNotJoined: [],
        lobbyOptions: lobbyOptions
    };
};
exports.createLobby = createLobby;
var createPlayer = function (name, lobby) {
    // Creates a player. Adds the player to the playersNotJoined array in the lobby
    // as a side effect. Returns the created player
    var createdPlayer = {
        id: (0, uuid_1.v4)(),
        name: name,
        ready: false
    };
    lobby.playersNotJoined = lobby.playersNotJoined.concat(createdPlayer);
    return createdPlayer;
};
exports.createPlayer = createPlayer;
var createGame = function (creatorId, lobby) {
    // Creates a game. Adds the game to the games array in the lobby as a side
    // effect. Returns the created game
    var creator = lobby.playersNotJoined.find(function (p) { return p.id === creatorId; });
    if (!creator) {
        throw new Error('A player with that id was not found');
    }
    var createdGame = {
        id: (0, uuid_1.v4)(),
        status: 'NOT_STARTED',
        players: [creator]
    };
    lobby.games = lobby.games.concat(createdGame);
    lobby.playersNotJoined = lobby.playersNotJoined
        .filter(function (p) { return p.id !== creatorId; });
    return createdGame;
};
exports.createGame = createGame;
var joinGame = function (gameId, playerId, lobby) {
    // Moves a player from the playersNotJoined array into the players array of the given
    // game as a side effect. Returns the updated game
    var game = lobby.games.find(function (g) { return g.id === gameId; });
    if (!game) {
        throw new Error('A game with that id was not found');
    }
    if (game.players.length === lobby.lobbyOptions.maxPlayers) {
        throw new Error('Cannot join that game as it is already full');
    }
    var player = lobby.playersNotJoined.find(function (p) { return p.id === playerId; });
    if (!player) {
        throw new Error('A player with that id was not found');
    }
    var updatedGame = __assign(__assign({}, cd(game)), { players: game.players.concat(player) });
    lobby.games = lobby.games.map(function (g) { return g.id === gameId ? updatedGame : g; });
    lobby.playersNotJoined = lobby.playersNotJoined
        .filter(function (p) { return p.id !== playerId; });
    return updatedGame;
};
exports.joinGame = joinGame;
var toggleReady = function (playerId, lobby) {
    // Sets the player's ready attribute to the opposite of what it was before
    var game = lobby.games.find(function (g) { return g.players.map(function (p) { return p.id; }).includes(playerId); });
    if (!game) {
        throw new Error('A game containing that player was not found');
    }
    var updatedGame = __assign(__assign({}, cd(game)), { players: game.players.map(function (p) { return p.id === playerId ? __assign(__assign({}, p), { ready: !p.ready }) : p; }) });
    console.log('updatedGame', updatedGame);
    lobby.games = lobby.games.map(function (g) { return g.id === updatedGame.id ? updatedGame : g; });
};
exports.toggleReady = toggleReady;
var startGame = function (gameId, lobby) {
    var game = lobby.games.find(function (g) { return g.id === gameId; });
    if (!game) {
        throw new Error('A game with that id was not found');
    }
    var allReady = (0, lodash_every_1.default)(game.players.map(function (p) { return p.ready; }));
    if (!allReady) {
        throw new Error('Players must all be ready to start game');
    }
    if (game.players.length < lobby.lobbyOptions.minPlayers) {
        throw new Error('Not enough players to start game');
    }
    var updatedGame = __assign(__assign({}, cd(game)), { status: 'IN_PROGRESS' });
    lobby.games = lobby.games.map(function (g) { return g.id === gameId ? updatedGame : g; });
    return updatedGame;
};
exports.startGame = startGame;
