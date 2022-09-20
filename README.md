# gqlobby-server

`npm install gqlobby-server`

Attempting to make an npm module for easily creating a realtime game lobby

Built on GraphQL subcsriptions for real time updates

**Warning**: Still a very early version

## Usage

With default options (games with 2-4 players)

```typescript
import startLobbyServer from 'gqlobby-server';

startLobbyServer();

```

With custom values for min and max players

```typescript
import startLobbyServer from 'gqlobby-server';

startLobbyServer({minPlayers: 3, maxPlayers: 6});

```

A server will be created automatically using Apollo-Server and GraphQL

Simply open up [http://localhost:4000/](http://localhost:4000/) to access Apollo studio and see all the queries, mutations and subscriptions available.

The next planned task is to make it more extensible, so a user can add to the GraphQL schema and resolvers to handle logic of the actual games once they have started. This is not implemented yet, so but currently you could still use this library to pair up users and then handle games on a different server, or even create a peer to peer connection if you're good at that sort of thing.

This project is just to take away the tedious task of creating the lobby. Handling the games is all up to you! They could be realtime, turn based or anything in between.

