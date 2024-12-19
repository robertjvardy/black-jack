# TODO

- create parent build and write readme
- add docker
- investigate: helmet morgan

## UI

- create a contect for the UI and store the socket client in there

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
