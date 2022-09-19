import { PubSub } from 'graphql-subscriptions';
export declare const lobby: import("../types").Lobby;
export declare const pubsub: PubSub;
export declare const resolvers: {
    Query: {
        lobby: () => import("../types").Lobby;
        allGames: () => import("../types").Game[];
        allPlayersNotJoined: () => import("../types").Player[];
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
    };
};
