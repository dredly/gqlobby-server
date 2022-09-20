"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryResolvers = void 0;
var getQueryResolvers = function (lobby) {
    return {
        lobby: function () { return lobby; },
        allGames: function (_root, args) {
            if (!args.gameStatus) {
                return lobby.games;
            }
            return lobby.games.filter(function (g) { return g.status === args.gameStatus; });
        },
        allPlayersNotJoined: function () { return lobby.playersNotJoined; },
        gameById: function (_root, args) {
            var foundGame = lobby.games.find(function (g) { return g.id === args.gameID; });
            if (!foundGame) {
                throw new Error('A game with that id was not found');
            }
            return foundGame;
        }
    };
};
exports.getQueryResolvers = getQueryResolvers;
