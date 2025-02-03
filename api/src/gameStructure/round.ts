import { ROUND_STATUS_MAP } from "../shared/constants";
import { RoundStatusValuesType, PlayerIndexType } from "../shared/types";
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

  startRound() {
    this.status = ROUND_STATUS_MAP.dealing;
  }

  checkForInsuranceEligibility(dealerHand: Hand) {
    const dealerShowingAce = dealerHand.cards[1].order === "A";
    if (dealerShowingAce) {
      this.status = ROUND_STATUS_MAP.insuranceCheck;
    } else {
      this.status = ROUND_STATUS_MAP.dealerBlackJackCheck;
    }
    return dealerShowingAce;
  }
}

export default Round;
