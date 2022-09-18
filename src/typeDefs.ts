import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Player {
        id: ID!
        name: String!
        ready: Boolean!
    }

    enum GameStatus {
        NOT_STARTED
        IN_PROGRESS
        FINISHED
    }

    type Game {
        id: ID!
        players: [Player!]!
        status: GameStatus
    }

    type LobbyOptions {
        minPlayers: Int!
        maxPlayers: Int!
    }

    type Lobby {
        games: [Game!]!
        playersNotJoined: [Player!]!
        lobbyOptions: LobbyOptions
    }

    type Query {
        lobby: Lobby!
        allGames: [Game!]!
        allPlayersNotJoined: [Player!]!
    }

    type Mutation {
        createLobby(minPlayers: Int! maxPlayers: Int!): Lobby
        createPlayer(name: String!): Player
        createGame(playerID: ID!): Game
        joinGame(gameID: ID! playerID: ID!): Game
        toggleReady(playerID: ID!): Game
        startGame(gameID: ID!): Game
    }
`;