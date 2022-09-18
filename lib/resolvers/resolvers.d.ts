export declare const state: {
    lobby: import("../types").Lobby;
};
export declare const resolvers: {
    Query: {
        lobby: () => import("../types").Lobby;
        allGames: () => import("../types").Game[];
        allPlayersNotJoined: () => import("../types").Player[];
    };
    Mutation: {
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
};
