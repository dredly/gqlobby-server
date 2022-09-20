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
var actions_1 = require("../actions");
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var testData_1 = require("./testData");
var cd = lodash_clonedeep_1.default;
describe('createLobby function', function () {
    it('works as expected with valid arguments', function () {
        expect((0, actions_1.createLobby)({ minPlayers: 1, maxPlayers: 7 }))
            .toEqual({
            games: [],
            playersNotJoined: [],
            lobbyOptions: {
                minPlayers: 1,
                maxPlayers: 7
            }
        });
    });
    it('throws an error if user tries to set maxPlayers < minPlayers', function () {
        expect(function () { return (0, actions_1.createLobby)({ minPlayers: 5, maxPlayers: 3 }); })
            .toThrowError('maxPlayers must be greater or equal than minPlayers');
    });
});
describe('createPlayer function', function () {
    it('Returns a new player and modifies the lobby as expected', function () {
        var lobby = cd(testData_1.emptyLobby);
        var newPlayer = (0, actions_1.createPlayer)('Miguel', lobby);
        expect(newPlayer.name).toEqual('Miguel');
        expect(newPlayer.ready).toBe(false);
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.emptyLobby)), { playersNotJoined: [newPlayer] }));
    });
});
describe('createGame function', function () {
    it('Returns a new game and modifies the lobby as expected', function () {
        var lobby = cd(testData_1.lobbyWithOnePlayer);
        var creator = lobby.playersNotJoined[0];
        var newGame = (0, actions_1.createGame)(creator.id, lobby);
        expect(newGame.status).toBe('NOT_STARTED');
        expect(newGame.players).toEqual([creator]);
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.lobbyWithOnePlayer)), { playersNotJoined: [], games: [newGame] }));
    });
    it('throws an error when given a faulty playerId', function () {
        var lobby = cd(testData_1.lobbyWithOnePlayer);
        expect(function () { return (0, actions_1.createGame)('falsy', lobby); }).toThrowError('A player with that id was not found');
    });
});
describe('joinGame function', function () {
    it('returns the updated game and updates the lobby as expected', function () {
        var lobby = cd(testData_1.lobbyWithOneGame);
        var game = lobby.games[0];
        var player = lobby.playersNotJoined[0];
        var updatedGame = (0, actions_1.joinGame)(game.id, player.id, lobby);
        expect(updatedGame.players).toEqual([game.players[0], player]);
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.lobbyWithOneGame)), { playersNotJoined: [], games: [updatedGame] }));
    });
    it('throws an error when given a faulty gameId or playerId', function () {
        var lobby = cd(testData_1.lobbyWithOneGame);
        var game = lobby.games[0];
        var player = lobby.playersNotJoined[0];
        expect(function () { return (0, actions_1.joinGame)('falsy', player.id, lobby); }).toThrowError('A game with that id was not found');
        expect(function () { return (0, actions_1.joinGame)(game.id, 'fake', lobby); }).toThrowError('A player with that id was not found');
    });
    it('throws an error if a player tries to join a game which is already full', function () {
        var lobby = cd(testData_1.lobbyWithFullGame);
        var game = lobby.games[0];
        var player = lobby.playersNotJoined[0];
        expect(function () { return (0, actions_1.joinGame)(game.id, player.id, lobby); }).toThrowError('Cannot join that game as it is already full');
    });
});
describe('toggleReady function', function () {
    it('updates the lobby as expected', function () {
        var lobby = cd(testData_1.lobbyWithOneGame);
        var player = lobby.games[0].players[0];
        (0, actions_1.toggleReady)(player.id, lobby);
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.lobbyWithOneGame)), { games: [__assign(__assign({}, lobby.games[0]), { players: [__assign(__assign({}, lobby.games[0].players[0]), { ready: true })] })] }));
    });
    it('Throws an error when given a faulty playerId', function () {
        var lobby = cd(testData_1.lobbyWithOneGame);
        expect(function () { return (0, actions_1.toggleReady)('fakeID', lobby); }).toThrowError('A game containing that player was not found');
    });
});
describe('startGame function', function () {
    it('updates the lobby as expected and returns the newly started game as expected when given valid input', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        var updatedGame = (0, actions_1.startGame)('2', lobby);
        expect(updatedGame).toEqual(__assign(__assign({}, cd(lobby.games[0])), { status: 'IN_PROGRESS' }));
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.lobbyWithReadyGame)), { games: [updatedGame] }));
    });
    it('Throws an error if given a faulty playerId', function () {
        var lobby = cd(testData_1.lobbyWithFullGame);
        expect(function () { return (0, actions_1.startGame)('7', lobby); }).toThrowError('A game containing that player was not found');
    });
    it('Throws an error if not all players are ready', function () {
        var lobby = cd(testData_1.lobbyWithFullGame);
        expect(function () { return (0, actions_1.startGame)('2', lobby); }).toThrowError('Players must all be ready to start game');
    });
    it('Throws an error if trying to start the game with not enough players', function () {
        var lobby = cd(testData_1.lobbyWithOneGameWithPlayerReady);
        expect(function () { return (0, actions_1.startGame)('2', lobby); }).toThrowError('Not enough players to start game');
    });
    it('Throws an error if a player besides the creator of the game tries to start it', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        expect(function () { return (0, actions_1.startGame)('3', lobby); }).toThrowError('Only the creator of the game can start it');
    });
});
describe('endGame function', function () {
    it('updates the lobby as expected and returns the newly ended game as expected when given valid input', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        var startedGame = (0, actions_1.startGame)('2', lobby);
        var endedGame = (0, actions_1.endGame)('1', lobby);
        expect(endedGame).toEqual(__assign(__assign({}, cd(startedGame)), { status: 'FINISHED' }));
        expect(lobby).toEqual(__assign(__assign({}, cd(testData_1.lobbyWithReadyGame)), { games: [endedGame] }));
    });
    it('Throws an error if trying to end a game that has not started', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        expect(function () { return (0, actions_1.endGame)('1', lobby); }).toThrowError('Only games in progress can be ended');
    });
    it('Throws an error if given a faulty gameId', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        (0, actions_1.startGame)('2', lobby);
        expect(function () { return (0, actions_1.endGame)('182', lobby); }).toThrowError('A game with that id was not found');
    });
});
describe('removeGame function', function () {
    it('updates the lobby and returns the newly removed game as expected when given valid input', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        var removedGame = (0, actions_1.removeGame)('1', lobby);
        expect(removedGame).toEqual(testData_1.lobbyWithReadyGame.games[0]);
        expect(lobby.games).toHaveLength(0);
    });
    it('Throws an error if given a faulty gameId', function () {
        var lobby = cd(testData_1.lobbyWithReadyGame);
        expect(function () { return (0, actions_1.removeGame)('182', lobby); }).toThrowError('A game with that id was not found');
    });
});
