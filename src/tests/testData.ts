import { Lobby } from "../types";
import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

export const emptyLobby: Lobby = {
    games: [],
    playersNotJoined: [],
    lobbyOptions: {
        minPlayers: 2,
        maxPlayers: 5,
    }
}

export const lobbyWithOnePlayer: Lobby = {
    ...cd(emptyLobby),
    playersNotJoined: [
        {
            id: '1',
            name: 'Johnny',
            ready: false
        }
    ]
}

export const lobbyWithOneGame: Lobby = {
    ...cd(lobbyWithOnePlayer),
    games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name:  'Lila',
                    ready: false
                }
            ]
        }
    ]
}