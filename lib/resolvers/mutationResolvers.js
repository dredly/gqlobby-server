"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutationResolvers = void 0;
var resolvers_1 = require("./resolvers");
var actions_1 = require("../actions");
var actions_2 = require("../actions");
var actions_3 = require("../actions");
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
    createGame: function (_root, args) { return (0, actions_3.createGame)(args.playerID, resolvers_1.state.lobby); }
};
