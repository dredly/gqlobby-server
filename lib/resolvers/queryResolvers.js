"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResolvers = void 0;
var resolvers_1 = require("./resolvers");
exports.queryResolvers = {
    lobby: function () { return resolvers_1.state.lobby; },
    allGames: function () { return resolvers_1.state.lobby.games; },
    allPlayersNotJoined: function () { return resolvers_1.state.lobby.playersNotJoined; }
};
