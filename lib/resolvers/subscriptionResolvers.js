"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionResolvers = void 0;
var resolvers_1 = require("./resolvers");
exports.subscriptionResolvers = {
    gameAdded: {
        subscribe: function () { return resolvers_1.pubsub.asyncIterator(['GAME_ADDED']); }
    },
    gameUpdated: {
        subscribe: function () { return resolvers_1.pubsub.asyncIterator(['GAME_UPDATED']); }
    },
    gameStarted: {
        subscribe: function () { return resolvers_1.pubsub.asyncIterator(['GAME_STARTED']); }
    },
};
