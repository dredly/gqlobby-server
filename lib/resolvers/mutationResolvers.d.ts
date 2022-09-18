export declare const mutationResolvers: {
    createLobby: (_root: undefined, args: {
        minPlayers: number;
        maxPlayers: number;
    }) => import("../types").Lobby;
    createPlayer: (_root: undefined, args: {
        name: string;
    }) => import("../types").Player;
    createGame: (_root: undefined, args: {
        playerID: string;
    }) => import("../types").Game;
};
