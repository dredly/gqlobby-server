"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMutationResolvers = void 0;
var resolvers_1 = require("./resolvers");
var actions_1 = require("../actions");
var actions_2 = require("../actions");
var actions_3 = require("../actions");
var actions_4 = require("../actions");
var actions_5 = require("../actions");
var actions_6 = require("../actions");
var actions_7 = require("../actions");
var getMutationResolvers = function (lobby) {
    return {
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
        },
        endGame: function (_root, args) {
            var endedGame = (0, actions_6.endGame)(args.gameID, lobby);
            void resolvers_1.pubsub.publish('GAME_ENDED', { gameEnded: endedGame });
            return endedGame;
        },
        removeGame: function (_root, args) {
            var removedGame = (0, actions_7.removeGame)(args.gameID, lobby);
            void resolvers_1.pubsub.publish('GAME_REMOVED', { gameRemoved: removedGame });
            return removedGame;
        }
    };
};
exports.getMutationResolvers = getMutationResolvers;
