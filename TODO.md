# TODO

## UI quality tasks

- make the table ui more dynamic

## General

- create parent build and write readme
- add docker
- investigate: helmet morgan

## Styles

- export screen width break point from styles/variables

## Authentication

- on seat assign create a jwt (currently implemented with uuid)
- jwt is assigned to the player obj
- jwt is then sent to the client
- client stores it in local storage

- implement the following:
  - add the jwt to a header in all subsequent requests
  - on the api, restrict calls based on presence of jwt for the seat
  - be sure to clear the local storage and emit to the server to free up the seat if the user closes the browser

## Implement Game Set Up

1. Game is Started
2. Player Joins seat
3. Player places bet
   - TODO change bet UI on the table to render the chip the player bet instead of
   - TODO add func for player to cancel bet
4. player readies up
   - TODO add func for the Table UI to show that player has readied up
   - TODO add func for player to make changes
5. once each present player readies up, hand inProgress state is set to true
6. Cards are delt

## Implement Game Logic

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

4. Dealer Action

5. Pay out players

Action is to player in set with highest index

## Add Docker

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
