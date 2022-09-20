# gqlobby-server

`npm install gqlobby-server`

Attempting to make an npm module for easily creating a realtime game lobby

Built on GraphQL subcsriptions for real time updates

**Warning**: Still a very early version

## Usage

With default options (games with 2-4 players)

```typescript
import startLobbyServer from 'gqlobby-server';

void startLobbyServer();

```

With custom values for min and max players

```typescript
import startLobbyServer from 'gqlobby-server';

void startLobbyServer({ lobbyOptions: {minPlayers: 3, maxPlayers: 6}});

```

A server will be created automatically using Apollo-Server and GraphQL. If you need to change the port from the default of 4000, simply pass a value to the `port` option.

```typescript
void startLobbyServer({ port: 8080 });
```

Simply open up [http://localhost:4000/](http://localhost:4000/) to access Apollo studio and see all the queries, mutations and subscriptions available.

You can use the server as is and redirect to another server to start the games, or extend the server with your own GraphQL schema, as shown below:

```typescript
import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server';
import startLobbyServer from 'gqlobby-server';

const typeDefs = gql`
    #Your typeDefs...
`;

const resolvers = {
    //Your resolvers...
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

void startLobbyServer({ schema });

```

The provided schema will be merged with the existing schema for the lobby server, so it may be a good idea to check over it to make sure you don't overwrite anything important.

If using TypeScript, you may also want to make use of and extend the existing types for Game and Player. For example in a poker game, you could reuse the Player type, which already includes the player name and unique id, and extend it to keep track of their hand and amount of money.

```typescript
import { Player } from "gqlobby-server/lib/types";

type Suit = 'SPADES' | 'CLUBS' | 'HEARTS' | 'DIAMONDS';

interface Card {
    value: number
    suit: Suit
}

export interface PlayerInGame extends Omit<Player, 'ready'> {
    money: number,
    hand: Card[]
}

```

## Scope of the project

This project is just to take away the tedious task of creating the lobby. Handling the games is all up to you! They could be realtime, turn based or anything in between.

