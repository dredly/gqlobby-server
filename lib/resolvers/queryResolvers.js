"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryResolvers = void 0;
var getQueryResolvers = function (lobby) {
    return {
        lobby: function () { return lobby; },
        allGames: function () { return lobby.games; },
        allPlayersNotJoined: function () { return lobby.playersNotJoined; }
    };
};
exports.getQueryResolvers = getQueryResolvers;
