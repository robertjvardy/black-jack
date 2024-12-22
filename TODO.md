# TODO

## General

- create parent build and write readme
- add docker
- investigate: helmet morgan

## Move the game state inside the react context

- move the game state inside the react context
- expose the game state from the context
- with this, all listeners can be placed in the context
- on connection, send the game state to the client so that it has the game state from the beginning
- the api calls to fetch game state can be removed (saved for dev)
- hide the implementation of the socket by exposing actions instead of sprinkling socket calls everywhere
- maybe there wont even be a need for exposing the socket once thats done?

## Authentication

- for now the user does not get redirected to the correct route to play
- there is nothing stopping the user from manually going to the route
- implement the following:
  - on seat assign create a jwt
  - assign jwt to the player obj
  - send the jwt to the UI
  - ui should store it some how
  - investigate best approach
    - cookie vs local storage vs state
  - add the jwt to a header in all subsequent requests
  - on the api, restrict calls based on presence of jwt for the seat

After the above is completed:

- create a second context "PlayerContext" to establish a connection to the authenticated namespace
- wrap the controls sections in the authenticated context
- create the name space on the server with the following code:

```ts
const authenticatedNamespace = io.of("/authenticated");

authenticatedNamespace.use((socket, next) => {
  const token = socket.handshake.auth.token;

  // Validate the token
  if (token === "your-auth-token") {
    return next();
  }

  return next(new Error("Authentication failed"));
});

authenticatedNamespace.on("connection", (socket) => {
  console.log(`Authenticated client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
```

## UI

## Docker

- api:

```docker
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 8080

# Run the server
CMD ["npm", "start"]
```
