import { compileDeck, shuffle } from "../shared/utils/cardUtils";

class Shoe {
  _cards = shuffle(compileDeck());

  restockShoe() {
    this._cards = shuffle(compileDeck());
  }

  pullCard() {
    if (this._cards.length === 0) {
      this.restockShoe();
    }
    return this._cards.pop()!;
  }
}

export default Shoe;
