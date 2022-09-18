import { gql } from 'apollo-server';

const typeDefs = gql`
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
        gameCount: Int!
    }
`;

export default typeDefs;