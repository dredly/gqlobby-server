"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.state = void 0;
var actions_1 = require("../actions");
var queryResolvers_1 = require("./queryResolvers");
var mutationResolvers_1 = require("./mutationResolvers");
var DEFAULT_LOBBY_OPTIONS = {
    minPlayers: 2,
    maxPlayers: 4
};
// eslint-disable-next-line prefer-const
exports.state = {
    lobby: (0, actions_1.createLobby)(DEFAULT_LOBBY_OPTIONS)
};
exports.resolvers = {
    Query: queryResolvers_1.queryResolvers,
    Mutation: mutationResolvers_1.mutationResolvers,
};
