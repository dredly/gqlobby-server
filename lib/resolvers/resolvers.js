"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.pubsub = exports.state = void 0;
var graphql_subscriptions_1 = require("graphql-subscriptions");
var actions_1 = require("../actions");
var queryResolvers_1 = require("./queryResolvers");
var mutationResolvers_1 = require("./mutationResolvers");
var subscriptionResolvers_1 = require("./subscriptionResolvers");
var DEFAULT_LOBBY_OPTIONS = {
    minPlayers: 2,
    maxPlayers: 4
};
// eslint-disable-next-line prefer-const
exports.state = {
    lobby: (0, actions_1.createLobby)(DEFAULT_LOBBY_OPTIONS)
};
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: queryResolvers_1.queryResolvers,
    Mutation: mutationResolvers_1.mutationResolvers,
    Subscription: subscriptionResolvers_1.subscriptionResolvers
};
