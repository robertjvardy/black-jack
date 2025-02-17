# TODO

## UI tasks

- add modal with fullscreen instructions (press f11 on windows and linux, Press ⌘ + Ctrl + f on mac)

## API tasks

## General tasks

- write readme for each project as well as parent
- add docker
- investigate: helmet morgan

## Game Set Up (Completed minus leave implications for game state)

1. Game is Started
2. Player Joins seat
3. Player places bet
4. player readies up
5. once each present player readies up, hand inProgress state is set to true
6. Cards are dealt sequentially

## Continuously available actions

- leave game
  - yet to implement functionality for when a player leaves a game
  - clear player state
  - prompt for warning
  - clear local storage on the users device

## Game Round Logic

1. Insurance (dealers showing ace)

   - Check for insurance elegability
   - If eligable Offer insurance for 20 seconds
   - once all players have answered or time expires continue
   - check dealers hand
   - pay out and end hand if 21

2. Dealer Blackjack (dealers showing 10)

   - check dealers hand
   - end hand if 21

3. Player Action

   - Action is to player in set with highest index

4. Dealer Action

5. Pay out players

6. End Current Round

## Future TODO's

### Add Docker

````

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
````

### Authentication

- on seat assign create a jwt (currently implemented with uuid)
- jwt is assigned to the player obj
- jwt is then sent to the client
- client stores it in local storage

- implement the following:
  - add the jwt to a header in all subsequent requests
  - on the api, restrict calls based on presence of jwt for the seat
  - be sure to clear the local storage and emit to the server to free up the seat if the user closes the browser
