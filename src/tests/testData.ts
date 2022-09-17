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

export const lobbyWithOneGameWithPlayerReady: Lobby = {
    ...cd(lobbyWithOneGame),
    games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name:  'Lila',
                    ready: true
                }
            ]
        }
    ]
}

export const lobbyWithFullGame: Lobby = {
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
                },
                {
                    id: '3',
                    name:  'Kevin',
                    ready: false
                },
                {
                    id: '4',
                    name:  'Stu',
                    ready: false
                }
            ]
        }
    ],
    lobbyOptions: {
        minPlayers: 2,
        maxPlayers: 3
    }
}

export const lobbyWithReadyGame: Lobby = {
    ...cd(lobbyWithFullGame),
    games: [
        {
            id: '1',
            status: 'NOT_STARTED',
            players: [
                {
                    id: '2',
                    name:  'Lila',
                    ready: true
                },
                {
                    id: '3',
                    name:  'Kevin',
                    ready: true
                },
                {
                    id: '4',
                    name:  'Stu',
                    ready: true
                }
            ]
        }
    ],
}