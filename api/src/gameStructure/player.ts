import { v4 as uuidv4 } from "uuid";

export type PlayerType = typeof Player;

class Player {
  #seatKey?: string;
  index: number;
  present: boolean;
  holdings: number = 0;
  currentBet?: number;
  options: any; // TODO create options type

  constructor(index: number) {
    this.index = index;
    this.present = false;
  }

  assign() {
    if (this.present) {
      // TODO throw error
    }
    this.present = true;
    this.holdings = 500; // TODO make this configurable
    this.#seatKey = uuidv4(); // TODO convert to jwt with proper encryption
    return this.#seatKey;
  }

  validateSeatKey(key: string) {
    return key === this.#seatKey;
  }

  remove() {
    this.present = false;
    this.holdings = 0;
    this.currentBet = undefined;
    this.#seatKey = undefined;
  }

  verifyBet(betAmount: number) {
    if (this.present) {
      return this.holdings >= betAmount;
    }
    // TODO throw player not present error
  }

  placeBet(betAmount: number) {
    if (this.verifyBet(betAmount)) {
      this.holdings = this.holdings - betAmount;
      this.currentBet = betAmount;
    } else {
      // TODO throw error
    }
  }
}

export default Player;
