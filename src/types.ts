export interface Player {
    id: string
    name: string
    ready: boolean
}

export type GameStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'FINISHED';
  
export interface Game {
    id: string
    status: GameStatus
    players: Player[]
}

export interface LobbyOptions {
    minPlayers: number,
    maxPlayers: number,
}

export interface Lobby {
    games: Game[],
    playersNotJoined: Player[],
    lobbyOptions: LobbyOptions
}