import { HAND_STATUS_MAP } from "../shared/constants";
import { HandStatusValuesType, PlayerIndiciesType } from "../shared/types";

class Hand {
  status: HandStatusValuesType = HAND_STATUS_MAP.pendingBets;
  players: PlayerIndiciesType[] = [];
  pendingPlayer?: PlayerIndiciesType;

  isHandStarted() {
    return this.status !== HAND_STATUS_MAP.pendingBets;
  }

  addPlayer(playerIndex: PlayerIndiciesType) {
    if (!this.players.includes(playerIndex) && !this.isHandStarted()) {
      this.players = [...this.players, playerIndex].sort();
    }
  }
}

export default Hand;
