"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResolvers = void 0;
var resolvers_1 = require("./resolvers");
exports.queryResolvers = {
    lobby: function () { return resolvers_1.lobby; },
    allGames: function () { return resolvers_1.lobby.games; },
    allPlayersNotJoined: function () { return resolvers_1.lobby.playersNotJoined; }
};
