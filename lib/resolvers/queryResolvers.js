"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryResolvers = void 0;
var state_1 = require("../state");
var lobby = state_1.state.lobby;
exports.queryResolvers = {
    lobby: function () { return lobby; },
    allGames: function () { return lobby.games; },
    allPlayersNotJoined: function () { return lobby.playersNotJoined; }
};
