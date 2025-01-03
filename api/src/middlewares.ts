import { Socket } from "socket.io";
import { NextType } from "./shared/types";
import Game from "./gameStructure/game";

export const playerAuthMiddleware =
  (game: Game) => (socket: Socket, next: NextType) => {
    const token = socket.handshake.auth.token;

    // Validate the token
    if (game.validateSeatKey(token) !== undefined) {
      return next();
    }

    return next(new Error("Seat Authentication failed"));
  };
