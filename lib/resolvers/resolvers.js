"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolvers = exports.pubsub = void 0;
var graphql_subscriptions_1 = require("graphql-subscriptions");
var queryResolvers_1 = require("./queryResolvers");
var mutationResolvers_1 = require("./mutationResolvers");
var subscriptionResolvers_1 = require("./subscriptionResolvers");
exports.pubsub = new graphql_subscriptions_1.PubSub();
var getResolvers = function (lobby) {
    return {
        Query: function () { return (0, queryResolvers_1.getQueryResolvers)(lobby); },
        Mutation: function () { return (0, mutationResolvers_1.getMutationResolvers)(lobby); },
        Subscription: subscriptionResolvers_1.subscriptionResolvers
    };
};
exports.getResolvers = getResolvers;
