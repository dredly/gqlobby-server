"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolvers = void 0;
var resolvers_1 = require("./resolvers");
var actions_1 = require("../actions");
var actions_2 = require("../actions");
var actions_3 = require("../actions");
var actions_4 = require("../actions");
var actions_5 = require("../actions");
var actions_6 = require("../actions");
exports.mutationResolvers = {
    createLobby: function (_root, args) {
        var opts = {
            minPlayers: args.minPlayers,
            maxPlayers: args.maxPlayers
        };
        resolvers_1.state.lobby = (0, actions_2.createLobby)(opts);
        return resolvers_1.state.lobby;
    },
    createPlayer: function (_root, args) { return (0, actions_1.createPlayer)(args.name, resolvers_1.state.lobby); },
    createGame: function (_root, args) {
        var newGame = (0, actions_3.createGame)(args.playerID, resolvers_1.state.lobby);
        void resolvers_1.pubsub.publish('GAME_ADDED', { gameAdded: newGame });
        return newGame;
    },
    joinGame: function (_root, args) {
        var joinedGame = (0, actions_4.joinGame)(args.gameID, args.playerID, resolvers_1.state.lobby);
        void resolvers_1.pubsub.publish('GAME_UPDATED', { gameUpdated: joinedGame });
        return joinedGame;
    },
    toggleReady: function (_root, args) {
        var updatedGame = (0, actions_5.toggleReady)(args.playerID, resolvers_1.state.lobby);
        void resolvers_1.pubsub.publish('GAME_UPDATED', { gameUpdated: updatedGame });
        return updatedGame;
    },
    startGame: function (_root, args) {
        var startedGame = (0, actions_6.startGame)(args.gameID, resolvers_1.state.lobby);
        void resolvers_1.pubsub.publish('GAME_STARTED', { gameStarted: startedGame });
        return startedGame;
    }
};
