import { LobbyOptions } from '../types';
export declare const mutationResolvers: {
    createLobby: (_root: undefined, args: {
        lobbyOptions: LobbyOptions;
    }) => import("../types").Lobby;
    createPlayer: (_root: undefined, args: {
        name: string;
    }) => import("../types").Player;
    createGame: (_root: undefined, args: {
        playerID: string;
    }) => import("../types").Game;
};
