"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lobbyWithReadyGame = exports.lobbyWithFullGame = exports.lobbyWithOneGameWithPlayerReady = exports.lobbyWithOneGame = exports.lobbyWithOnePlayer = exports.emptyLobby = void 0;
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var cd = lodash_clonedeep_1.default;
exports.emptyLobby = {
    games: [],
    playersNotJoined: [],
    lobbyOptions: {
        minPlayers: 2,
        maxPlayers: 5,
    }
};
exports.lobbyWithOnePlayer = __assign(__assign({}, cd(exports.emptyLobby)), { playersNotJoined: [
        {
            id: '1',
            name: 'Johnny',
            ready: false
        }
    ] });
exports.lobbyWithOneGame = __assign(__assign({}, cd(exports.lobbyWithOnePlayer)), { games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name: 'Lila',
                    ready: false
                }
            ]
        }
    ] });
exports.lobbyWithOneGameWithPlayerReady = __assign(__assign({}, cd(exports.lobbyWithOneGame)), { games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name: 'Lila',
                    ready: true
                }
            ]
        }
    ] });
exports.lobbyWithFullGame = __assign(__assign({}, cd(exports.lobbyWithOnePlayer)), { games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name: 'Lila',
                    ready: false
                },
                {
                    id: '3',
                    name: 'Kevin',
                    ready: false
                },
                {
                    id: '4',
                    name: 'Stu',
                    ready: false
                }
            ]
        }
    ], lobbyOptions: {
        minPlayers: 2,
        maxPlayers: 3
    } });
exports.lobbyWithReadyGame = __assign(__assign({}, cd(exports.lobbyWithFullGame)), { games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name: 'Lila',
                    ready: true
                },
                {
                    id: '3',
                    name: 'Kevin',
                    ready: true
                },
                {
                    id: '4',
                    name: 'Stu',
                    ready: true
                }
            ]
        }
    ] });
