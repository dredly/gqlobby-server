"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
var actions_1 = require("./actions");
var constants_1 = require("./constants");
exports.state = {
    lobby: (0, actions_1.createLobby)(constants_1.DEFAULT_LOBBY_OPTIONS)
};
