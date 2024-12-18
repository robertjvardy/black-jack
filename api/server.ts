import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = 8080;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);

  socket.on("ping", (cb) => {
    console.log("PING");
    cb();
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

httpServer.listen({ port: PORT }, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.get("/test", (req, res) => {
  res.send(`this is a test`);
});

app.listen(PORT + 1, () => {
  console.log(`server is running on port ${PORT + 1}`);
});
