import { createLobby, createPlayer, createGame, joinGame, toggleReady, startGame } from "../actions";
import cloneDeep from 'lodash.clonedeep';
import { 
    emptyLobby, 
    lobbyWithOnePlayer, 
    lobbyWithOneGame, 
    lobbyWithFullGame,
    lobbyWithOneGameWithPlayerReady,
    lobbyWithReadyGame 
} from "./testData";

const cd = cloneDeep;

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

    it('throws an error if a player tries to join a game which is already full', () => {
        const lobby = cd(lobbyWithFullGame);
        const game = lobby.games[0];
        const player = lobby.playersNotJoined[0];
        expect(() => joinGame(game.id, player.id, lobby)).toThrowError('Cannot join that game as it is already full');
    })
})

describe('toggleReady function', () => {
    it('updates the lobby as expected', () => {
        const lobby = cd(lobbyWithOneGame);
        const player = lobby.games[0].players[0];
        toggleReady(player.id, lobby);

        expect(lobby).toEqual({
            ...cd(lobbyWithOneGame),
            games: [{ ...lobby.games[0], players: [{ ...lobby.games[0].players[0], ready: true }] }]
        })
    })
    it('Throws an error when given a faulty playerId', () => {
        const lobby = cd(lobbyWithOneGame);
        expect(() => toggleReady('fakeID', lobby)).toThrowError('A game containing that player was not found');
    })
})

describe('startGame function', () => {
    it('updates the lobby as expected and returns the newly started game as expected when given valid input', () => {
        const lobby = cd(lobbyWithReadyGame);
        const updatedGame = startGame('1', lobby);
        expect(updatedGame).toEqual({
            ...cd(lobby.games[0]),
            status: 'IN_PROGRESS'
        })

        expect(lobby).toEqual({
            ...cd(lobbyWithReadyGame),
            games: [updatedGame]
        })
    })

    it('Throws an error if given a faulty gameId', () => {
        const lobby = cd(lobbyWithFullGame);
        expect(() => startGame('7', lobby)).toThrowError('A game with that id was not found');
    })

    it('Throws an error if not all players are ready', () => {
        const lobby = cd(lobbyWithFullGame);
        expect(() => startGame('1', lobby)).toThrowError('Players must all be ready to start game');
    })

    it('Throws an error if trying to start the game with not enough players', () => {
        const lobby = cd(lobbyWithOneGameWithPlayerReady);
        expect(() => startGame('1', lobby)).toThrowError('Not enough players to start game');
    })
})