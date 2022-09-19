export declare const mutationResolvers: {
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
