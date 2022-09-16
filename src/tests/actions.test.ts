import { createLobby, createPlayer, createGame, joinGame } from "../actions";
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

const lobbyWithOneGame: Lobby = {
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

    it('throws an error when given a faulty playerId', () => {
        const lobby = cd(lobbyWithOnePlayer);
        expect(() => createGame('falsy', lobby)).toThrowError('A player with that id was not found');
    })
})

describe('joinGame function', () => {
    it('returns the updated game and updates the lobby as expected', () => {
        const lobby = cd(lobbyWithOneGame);
        const game = lobby.games[0];
        const player = lobby.playersNotJoined[0];
        const updatedGame = joinGame(game.id, player.id, lobby);
        expect(updatedGame.players).toEqual([game.players[0], player])

        expect(lobby).toEqual({
            ...cd(lobbyWithOneGame), playersNotJoined: [], games: [updatedGame]
        })
    })

    it('throws an error when given a faulty gameId or playerId', () => {
        const lobby = cd(lobbyWithOneGame);
        const game = lobby.games[0];
        const player = lobby.playersNotJoined[0];
        expect(() => joinGame('falsy', player.id, lobby)).toThrowError('A game with that id was not found');
        expect(() => joinGame(game.id, 'fake', lobby)).toThrowError('A player with that id was not found');
    })
})