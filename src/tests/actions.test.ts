import { createLobby, createPlayer, createGame } from "../actions";
import { Lobby } from "../types";
import cloneDeep from 'lodash.clonedeep';

const cd = cloneDeep;

const emptyLobby: Lobby = {
    games: [],
    playersNotJoined: [],
    lobbyOptions: {
        minPlayers: 2,
        maxPlayers: 5,
    }
}

const lobbyWithOnePlayer: Lobby = {
    ...cd(emptyLobby),
    playersNotJoined: [
        {
            id: '1',
            name: 'Johnny',
            ready: false
        }
    ]
}

describe('createLobby function', () => {
    it('works as expected with valid arguments', () => {
        expect(createLobby({minPlayers: 1, maxPlayers: 7}))
            .toEqual({
                games: [],
                playersNotJoined: [],
                lobbyOptions: {
                    minPlayers: 1,
                    maxPlayers: 7
                }
            })
    })
    it('throws an error if user tries to set maxPlayers < minPlayers', () => {
        expect(() => createLobby({minPlayers: 5, maxPlayers: 3}))
            .toThrowError('maxPlayers must be greater or equal than minPlayers');
    })
})

describe('createPlayer function', () => {
    it('Returns a new player and modifies the lobby as expected', () => {
        const lobby = cd(emptyLobby);
        const newPlayer = createPlayer('Miguel', lobby);

        expect(newPlayer.name).toEqual('Miguel');
        expect(newPlayer.ready).toBe(false);

        expect(lobby).toEqual({
            ...cd(emptyLobby), playersNotJoined: [newPlayer]
        })
    })
})

describe('createGame function', () => {
    it('Returns a new game and modifies the lobby as expected', () => {
        const lobby = cd(lobbyWithOnePlayer);
        const creator = lobby.playersNotJoined[0];
        const newGame = createGame(creator.id, lobby);

        expect(newGame.status).toBe('NOT_STARTED');
        expect(newGame.players).toEqual([creator]);

        expect(lobby).toEqual({
            ...cd(lobbyWithOnePlayer), playersNotJoined: [], games: [newGame]
        })
    })
})