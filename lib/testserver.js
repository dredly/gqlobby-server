"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("@graphql-tools/schema");
var apollo_server_1 = require("apollo-server");
var server_1 = require("./server");
var cardList = [];
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Card {\n        value: Int!\n        suit: String!\n    }\n\n    type Query {\n        allCards: [Card!]!\n    }\n\n    type Mutation {\n        addCard(value: Int!, suit: String!): Card\n    }\n"], ["\n    type Card {\n        value: Int!\n        suit: String!\n    }\n\n    type Query {\n        allCards: [Card!]!\n    }\n\n    type Mutation {\n        addCard(value: Int!, suit: String!): Card\n    }\n"])));
var resolvers = {
    Query: {
        allCards: function () { return cardList; }
    },
    Mutation: {
        addCard: function (_root, args) {
            var newCard = {
                value: args.value,
                suit: args.suit
            };
            cardList.push(newCard);
            return newCard;
        }
    }
};
var schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolvers });
void (0, server_1.startLobbyServer)({ schema: schema, lobbyOptions: { minPlayers: 3, maxPlayers: 4 } });
var templateObject_1;
