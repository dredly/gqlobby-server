"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var DEFAULT_LOBBY_OPTIONS = {
    minPlayers: 2,
    maxPlayers: 4
};
var lobby = (0, actions_1.createLobby)(DEFAULT_LOBBY_OPTIONS);
var resolvers = {
    Query: {
        gameCount: function () { return lobby.games.length; }
    }
};
exports.default = resolvers;
