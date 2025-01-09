import { CardOrderType, CardSuitType } from "../shared/types";

class Card {
  #order: CardOrderType;
  #suit: CardSuitType;

  constructor(order: CardOrderType, suit: CardSuitType) {
    this.#order = order;
    this.#suit = suit;
  }

  getOrder() {
    return this.#order;
  }

  getSuit() {
    return this.#suit;
  }
}

export default Card;
