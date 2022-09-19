"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolvers = void 0;
var resolvers_1 = require("./resolvers");
var state_1 = require("../state");
var lobby = state_1.state.lobby;
var actions_1 = require("../actions");
var actions_2 = require("../actions");
var actions_3 = require("../actions");
var actions_4 = require("../actions");
var actions_5 = require("../actions");
exports.mutationResolvers = {
    createPlayer: function (_root, args) { return (0, actions_1.createPlayer)(args.name, lobby); },
    createGame: function (_root, args) {
        var newGame = (0, actions_2.createGame)(args.playerID, lobby);
        void resolvers_1.pubsub.publish('GAME_ADDED', { gameAdded: newGame });
        return newGame;
    },
    joinGame: function (_root, args) {
        var joinedGame = (0, actions_3.joinGame)(args.gameID, args.playerID, lobby);
        void resolvers_1.pubsub.publish('GAME_UPDATED', { gameUpdated: joinedGame });
        return joinedGame;
    },
    toggleReady: function (_root, args) {
        var updatedGame = (0, actions_4.toggleReady)(args.playerID, lobby);
        void resolvers_1.pubsub.publish('GAME_UPDATED', { gameUpdated: updatedGame });
        return updatedGame;
    },
    startGame: function (_root, args) {
        var startedGame = (0, actions_5.startGame)(args.playerID, lobby);
        void resolvers_1.pubsub.publish('GAME_STARTED', { gameStarted: startedGame });
        return startedGame;
    }
};
