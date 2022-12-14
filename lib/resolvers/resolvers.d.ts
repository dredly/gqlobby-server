import { PubSub } from 'graphql-subscriptions';
import { Lobby } from '../types';
export declare const pubsub: PubSub;
export declare const getResolvers: (lobby: Lobby) => {
    Query: {
        lobby: () => Lobby;
        allGames: (_root: undefined, args: {
            gameStatus?: import("../types").GameStatus | undefined;
        }) => import("../types").Game[];
        allPlayersNotJoined: () => import("../types").Player[];
        gameById: (_root: undefined, args: {
            gameID: string;
        }) => import("../types").Game;
    };
    Mutation: {
        createPlayer: (_root: undefined, args: {
            name: string;
        }) => import("../types").Player;
        createGame: (_root: undefined, args: {
            playerID: string;
        }) => import("../types").Game;
        joinGame: (_root: undefined, args: {
            gameID: string;
            playerID: string;
        }) => import("../types").Game;
        toggleReady: (_root: undefined, args: {
            playerID: string;
        }) => import("../types").Game;
        startGame: (_root: undefined, args: {
            playerID: string;
        }) => import("../types").Game;
        endGame: (_root: undefined, args: {
            gameID: string;
        }) => import("../types").Game;
        removeGame: (_root: undefined, args: {
            gameID: string;
        }) => import("../types").Game;
    };
    Subscription: {
        gameAdded: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
        gameUpdated: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
        gameStarted: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
        gameEnded: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
        gameRemoved: {
            subscribe: () => AsyncIterator<unknown, any, undefined>;
        };
    };
};
