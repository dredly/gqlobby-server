"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLobbyServer = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = require("@graphql-tools/schema");
var ws_1 = require("ws");
var ws_2 = require("graphql-ws/lib/use/ws");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var typeDefs_1 = require("./typeDefs");
var resolvers_1 = require("./resolvers/resolvers");
var actions_1 = require("./actions");
var constants_1 = require("./constants");
var schema_2 = require("@graphql-tools/schema");
var startLobbyServer = function (serverOptions) { return __awaiter(void 0, void 0, void 0, function () {
    var app, httpServer, lobby, lobbySchema, schema, wsServer, serverCleanup, server, PORT;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                httpServer = http_1.default.createServer(app);
                lobby = (0, actions_1.createLobby)((serverOptions === null || serverOptions === void 0 ? void 0 : serverOptions.lobbyOptions) ? serverOptions.lobbyOptions : constants_1.DEFAULT_LOBBY_OPTIONS);
                lobbySchema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: (0, resolvers_1.getResolvers)(lobby) });
                schema = (serverOptions === null || serverOptions === void 0 ? void 0 : serverOptions.schema)
                    ? (0, schema_2.mergeSchemas)({ schemas: [lobbySchema, serverOptions.schema] })
                    : lobbySchema;
                wsServer = new ws_1.WebSocketServer({
                    // This is the `httpServer` returned by createServer(app);
                    server: httpServer,
                    // Pass a different path here if your ApolloServer serves at
                    // a different path.
                    path: '',
                });
                serverCleanup = (0, ws_2.useServer)({ schema: schema }, wsServer);
                server = new apollo_server_express_1.ApolloServer({
                    schema: schema,
                    plugins: [
                        // Proper shutdown for the WebSocket server.
                        {
                            // eslint-disable-next-line @typescript-eslint/require-await
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, serverCleanup.dispose()];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                },
                                            }];
                                    });
                                });
                            },
                        },
                    ],
                });
                return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                server.applyMiddleware({
                    app: app,
                    path: '/',
                });
                PORT = 4000;
                httpServer.listen(PORT, function () {
                    return console.log("Server is now running on http://localhost:".concat(PORT));
                });
                return [2 /*return*/];
        }
    });
}); };
exports.startLobbyServer = startLobbyServer;
