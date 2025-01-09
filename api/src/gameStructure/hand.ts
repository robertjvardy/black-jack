import Card from "./card";

class Hand {
  cards: Card[] = [];

  addCard(card: Card) {
    this.cards = [...this.cards, card];
  }

  //   TODO implementfn to calculate the total of the cards in the hand
  //   will likely need to map letters to numbers
  //   hands with an ace will likely have to return two numbers
  fetchTotal() {}
}

export default Hand;
