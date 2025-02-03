import { calculateHandTotal } from "../shared/utils/cardUtils";
import Card from "./card";

class Hand {
  cards: Card[] = [];
  total: number[] = [];

  addCard(card: Card) {
    this.cards = [...this.cards, card];
    this.total = calculateHandTotal(this.cards);
  }
}

export default Hand;
