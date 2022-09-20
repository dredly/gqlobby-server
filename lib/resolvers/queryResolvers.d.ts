import { GameStatus, Lobby } from '../types';
export declare const getQueryResolvers: (lobby: Lobby) => {
    lobby: () => Lobby;
    allGames: (_root: undefined, args: {
        gameStatus?: GameStatus;
    }) => import("../types").Game[];
    allPlayersNotJoined: () => import("../types").Player[];
    gameById: (_root: undefined, args: {
        gameID: string;
    }) => import("../types").Game;
};
