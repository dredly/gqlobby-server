"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.pubsub = void 0;
var graphql_subscriptions_1 = require("graphql-subscriptions");
var queryResolvers_1 = require("./queryResolvers");
var mutationResolvers_1 = require("./mutationResolvers");
var subscriptionResolvers_1 = require("./subscriptionResolvers");
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: queryResolvers_1.queryResolvers,
    Mutation: mutationResolvers_1.mutationResolvers,
    Subscription: subscriptionResolvers_1.subscriptionResolvers
};
