import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Game from "./gameStructure/game";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const game = new Game();

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);
  socket.emit("update", game.fetchGameState());

  socket.on("assign-player", (data) => {
    const playerIndex = data.index;
    const seatKey = game.assignPlayer(playerIndex);
    console.log(`Player ${data.index} assigned`);
    socket.emit("seat-key", { seatKey, seatIndex: playerIndex });
    io.emit("player-update", game.fetchGameState().players);
  });

  socket.on("start-game", () => {
    game.startGame();
    io.emit("clear-local-storage");
    io.emit("update", game.fetchGameState());
  });

  socket.on("leave-seat", (data) => {
    const seatIndex = parseInt(data.seatIndex);
    const seatKey = data.seatKey;
    game.removePlayer({ seatIndex, seatKey });
    socket.emit("clear-local-storage");
    io.emit("update", game.fetchGameState());
  });

  socket.on("validate-seat-key", (data) => {
    console.log("validate-seat-key: ", data.seatKey);
    const index = game.validateSeatKey(data.seatKey);
    if (index !== undefined) {
      socket.emit("seat-key-validated", { index });
    } else {
      socket.emit("seat-key-denied");
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

const playerNamespace = io.of("/player");

playerNamespace.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);

  // Validate the token
  if (game.validateSeatKey(token) !== undefined) {
    return next();
  }

  return next(new Error("Authentication failed"));
});

playerNamespace.on("connection", (socket) => {
  console.log(`Authenticated client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// TODO remove after dev
app.get("/state", (req, res) => {
  res.send(game.fetchGameState());
});

app.get("/restart", (req, res) => {
  game.startGame();
  res.status(200).send();
});

httpServer.listen({ port: PORT, hostname: HOST }, () => {
  console.log(`Listening on port: ${PORT}`);
});
