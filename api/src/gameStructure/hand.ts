import { HAND_STATUS_MAP } from "../shared/constants";
import { HandStatusValuesType, PlayerIndexType } from "../shared/types";

class Hand {
  status: HandStatusValuesType = HAND_STATUS_MAP.pendingBets;
  players: PlayerIndexType[] = [];
  pendingPlayer?: PlayerIndexType;

  isHandStarted() {
    return this.status !== HAND_STATUS_MAP.pendingBets;
  }

  addPlayer(playerIndex: PlayerIndexType) {
    if (!this.players.includes(playerIndex) && !this.isHandStarted()) {
      this.players = [...this.players, playerIndex].sort();
    }
  }
}

export default Hand;
