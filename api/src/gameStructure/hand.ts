import { PlayerIndiciesType } from "../shared/types";

class Hand {
  inProgress: boolean = false;
  players: PlayerIndiciesType[] = [];

  constructor(inProgress: boolean = false) {
    this.inProgress = inProgress;
  }

  startHand() {
    this.inProgress = true;
  }

  addPlayer(playerIndex: PlayerIndiciesType) {
    if (!this.players.includes(playerIndex) && !this.inProgress) {
      this.players = [...this.players, playerIndex].sort();
    }
  }
}

export default Hand;
