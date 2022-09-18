"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Player {\n        id: ID!\n        name: String!\n        ready: Boolean!\n    }\n\n    enum GameStatus {\n        NOT_STARTED\n        IN_PROGRESS\n        FINISHED\n    }\n\n    type Game {\n        id: ID!\n        players: [Player!]!\n        status: GameStatus\n    }\n\n    type LobbyOptions {\n        minPlayers: Int!\n        maxPlayers: Int!\n    }\n\n    type Lobby {\n        games: [Game!]!\n        playersNotJoined: [Player!]!\n        lobbyOptions: LobbyOptions\n    }\n\n    type Query {\n        gameCount: Int!\n    }\n"], ["\n    type Player {\n        id: ID!\n        name: String!\n        ready: Boolean!\n    }\n\n    enum GameStatus {\n        NOT_STARTED\n        IN_PROGRESS\n        FINISHED\n    }\n\n    type Game {\n        id: ID!\n        players: [Player!]!\n        status: GameStatus\n    }\n\n    type LobbyOptions {\n        minPlayers: Int!\n        maxPlayers: Int!\n    }\n\n    type Lobby {\n        games: [Game!]!\n        playersNotJoined: [Player!]!\n        lobbyOptions: LobbyOptions\n    }\n\n    type Query {\n        gameCount: Int!\n    }\n"])));
exports.default = typeDefs;
var templateObject_1;
