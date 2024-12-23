# TODO

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
