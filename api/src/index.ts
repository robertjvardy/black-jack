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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const game = new Game();

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);

  socket.on("ping", (cb) => {
    console.log("PING");
    cb();
  });

  socket.on("init-board", () => {
    console.log("Init Board");
    socket.emit("update", game.fetchGameState());
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

// TODO move to controller

app.get("/init", (req, res) => {
  res.send(game.fetchGameState());
});

app.post("/start", (req, res) => {
  game.startGame();
  res.status(200).send();
});

app.get("/restart", (req, res) => {
  game.startGame();
  res.status(200).send();
});

httpServer.listen({ port: PORT, hostname: "0.0.0.0" }, () => {
  console.log(`Listening on port: ${PORT}`);
});
