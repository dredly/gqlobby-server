import { Lobby } from '../types';
export declare const getQueryResolvers: (lobby: Lobby) => {
    lobby: () => Lobby;
    allGames: () => import("../types").Game[];
    allPlayersNotJoined: () => import("../types").Player[];
};
