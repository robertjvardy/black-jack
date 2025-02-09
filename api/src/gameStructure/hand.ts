import { PLAYER_HAND_RESULT_MAP, TWENTY_ONE } from "../shared/constants";
import { calculateHandTotal } from "../shared/utils/cardUtils";
import Card from "./card";

class Hand {
  cards: Card[] = [];
  #total: number[] = [];

  addCard(card: Card) {
    this.cards = [...this.cards, card];
    this.#total = calculateHandTotal(this.cards);
  }

  reset() {
    this.cards = [];
    this.#total = [];
  }

  getTotal() {
    return this.#total.pop();
  }

  isBusted() {
    const total = this.getTotal();
    return total && total > TWENTY_ONE;
  }

  isBlackJack() {
    const total = this.#total.pop();
    return total && total == TWENTY_ONE && this.cards.length === 2;
  }

  evaluateHand(dealerTotal: number) {
    const playerTotal = this.#total.pop();
    if (playerTotal) {
      // Player Loses
      if (this.isBusted() || playerTotal < dealerTotal) {
        return PLAYER_HAND_RESULT_MAP.loss;
      }
      // Player Wins
      if (!this.isBusted() && playerTotal > dealerTotal) {
        return PLAYER_HAND_RESULT_MAP.win;
      }
      // Player Pushes
      if (playerTotal === dealerTotal) {
        return PLAYER_HAND_RESULT_MAP.push;
      }
      // Player BlackJack
      if (this.isBlackJack()) {
        return PLAYER_HAND_RESULT_MAP.blackJack;
      }
    } else {
      // throw error
    }
  }
}

export default Hand;
