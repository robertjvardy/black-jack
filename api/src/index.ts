import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Game, { PlayerInsuranceSelectionStatus } from "./gameStructure/game";
import { playerAuthMiddleware } from "./middlewares";
import {
  PlayerIndexType,
  SeatInfoDto,
  baseEventNames,
  playerEventNames,
  SeatIndexDto,
  BetDto,
  InsuranceSelection,
} from "shared-resources";

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

export const updateGameState = () =>
  io.emit(baseEventNames.UPDATE, game.fetchGameState());

io.on("connection", (socket) => {
  console.log(`Connected ${socket.id}`);
  updateGameState();

  socket.on(baseEventNames.ASSIGN_PLAYER, ({ seatIndex }: SeatIndexDto) => {
    const seatKey = game.assignPlayer(seatIndex);
    console.log(`Player ${seatIndex} assigned`);
    socket.emit(baseEventNames.SEAT_KEY, { seatKey, seatIndex });
    updateGameState();
  });

  socket.on(baseEventNames.START_GAME, () => {
    game.startGame();
    io.emit(baseEventNames.CLEAR_LOCAL_STORAGE);
    updateGameState();
  });

  socket.on(
    baseEventNames.LEAVE_SEAT,
    ({ seatIndex, seatKey }: SeatInfoDto) => {
      game.removePlayer({ seatIndex, seatKey });
      io.emit(baseEventNames.CLEAR_LOCAL_STORAGE);
      updateGameState();
    }
  );

  socket.on(baseEventNames.VALIDATE_SEAT_KEY, ({ seatKey }: SeatInfoDto) => {
    console.log("validate-seat-key: ", seatKey);
    const index = game.validateSeatKey(seatKey);
    // TODO try to check index === seatIndex
    if (index !== undefined) {
      socket.emit(baseEventNames.SEAT_KEY_VALIDATED, { index });
    } else {
      socket.emit(baseEventNames.SEAT_KEY_DENIED);
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

// TODO move this namespace to seperate file and export game instance
// TODO move the calls to updateGameState inside corresponding functions now that it is exported

const playerNamespace = io.of("/player");

playerNamespace.use(playerAuthMiddleware(game));

playerNamespace.on("connection", (socket) => {
  const token = socket.handshake.auth.token;
  const seatIndex = game.validateSeatKey(token) as PlayerIndexType;

  console.log(`Authenticated client connected: ${socket.id}`);
  updateGameState();

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  socket.on(playerEventNames.PLACE_BET, ({ amount }: BetDto) => {
    game.onPlayerBet(seatIndex, amount);
    updateGameState();
  });

  socket.on(playerEventNames.CANCEL_BET, () => {
    game.onCancelBet(seatIndex);
    updateGameState();
  });

  socket.on(playerEventNames.PLAYER_READY, () => {
    game.onPlayerReady(seatIndex);
  });

  socket.on(
    playerEventNames.INSURANCE_SELECTION,
    ({ selection }: InsuranceSelection) => {
      const status = game.insuranceSelection(seatIndex, selection);
      if (status === PlayerInsuranceSelectionStatus.complete) {
        game.evaluateInsurance();
      }
      updateGameState();
    }
  );
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
