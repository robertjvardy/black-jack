import {
  PlayerIndexType,
  ROUND_STATUS_MAP,
  RoundStatusValuesType,
} from "shared-resources";
import Hand from "./hand";

class Round {
  status: RoundStatusValuesType = ROUND_STATUS_MAP.pendingBets;
  players: PlayerIndexType[] = [];
  pendingPlayer?: PlayerIndexType;

  isRoundStarted() {
    return this.status !== ROUND_STATUS_MAP.pendingBets;
  }

  addPlayer(playerIndex: PlayerIndexType) {
    if (!this.players.includes(playerIndex) && !this.isRoundStarted()) {
      this.players = [...this.players, playerIndex].sort();
    }
  }

  setStatus(status: RoundStatusValuesType) {
    console.log(`Setting status to: ${status}`);
    this.status = status;
  }

  startRound() {
    this.setStatus(ROUND_STATUS_MAP.dealing);
  }

  restartRound() {
    this.setStatus(ROUND_STATUS_MAP.pendingBets);
    this.pendingPlayer = undefined;
    this.players = [];
  }

  checkForInsuranceEligibility(dealerHand: Hand) {
    const dealerShowingAce = dealerHand.cards[1].order === "A";
    if (dealerShowingAce) {
      this.setStatus(ROUND_STATUS_MAP.insuranceCheck);
    } else {
      this.setStatus(ROUND_STATUS_MAP.dealerBlackJackCheck);
    }
    return dealerShowingAce;
  }
}

export default Round;
