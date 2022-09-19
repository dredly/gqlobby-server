"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.pubsub = exports.lobby = void 0;
var graphql_subscriptions_1 = require("graphql-subscriptions");
var actions_1 = require("../actions");
var options_1 = require("../options");
var queryResolvers_1 = require("./queryResolvers");
var mutationResolvers_1 = require("./mutationResolvers");
var subscriptionResolvers_1 = require("./subscriptionResolvers");
exports.lobby = (0, actions_1.createLobby)(options_1.options.lobbyOptions);
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: queryResolvers_1.queryResolvers,
    Mutation: mutationResolvers_1.mutationResolvers,
    Subscription: subscriptionResolvers_1.subscriptionResolvers
};
