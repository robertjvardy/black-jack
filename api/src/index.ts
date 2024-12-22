import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Game from "./gameStructure/game";

const PORT = 8080;
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

  socket.on("init-table", () => {
    console.log("Init table");
    socket.emit("update", game.fetchGameState());
  });

  socket.on("assign-player", (data) => {
    const playerIndex = data.index;
    const seatKey = game.assignPlayer(playerIndex);
    console.log(`Player ${data.index} assigned`);
    socket.emit("seat-key", { seatKey });
    io.emit("player-update", game.fetchGameState().players);
  });

  socket.on("start-game", () => {
    game.startGame();
    io.emit("update", game.fetchGameState());
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
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

httpServer.listen({ port: PORT, hostname: "0.0.0.0" }, () => {
  console.log(`Listening on port: ${PORT}`);
});
