import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { checkGameStarted } from "./game";

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

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);

  if (checkGameStarted()) {
    socket.send(checkGameStarted());
  }

  socket.on("ping", (cb) => {
    console.log("PING");
    cb();
  });

  socket.on("init-game", () => {});

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

app.get("/test", (req, res) => {
  res.send(`this is a test`);
});

httpServer.listen({ port: PORT, hostname: "0.0.0.0" }, () => {
  console.log(`Listening on port: ${PORT}`);
});
