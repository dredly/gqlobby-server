import { LobbyOptions, Lobby, Player, Game } from './types';
export declare const createLobby: (lobbyOptions: LobbyOptions) => Lobby;
export declare const createPlayer: (name: string, lobby: Lobby) => Player;
export declare const createGame: (creatorId: string, lobby: Lobby) => Game;
export declare const joinGame: (gameId: string, playerId: string, lobby: Lobby) => Game;
export declare const toggleReady: (playerId: string, lobby: Lobby) => void;
export declare const startGame: (gameId: string, lobby: Lobby) => Game;
