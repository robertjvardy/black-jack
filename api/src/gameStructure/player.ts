import { v4 as uuidv4 } from "uuid";

export type PlayerType = typeof Player;

class Player {
  #seatKey?: string;
  index: number;
  present: boolean;

  constructor(index: number) {
    this.index = index;
    this.present = false;
  }

  assign() {
    if (this.present) {
      // TODO throw error
    }
    this.present = true;
    this.#seatKey = uuidv4(); // TODO convert to jwt with proper encryption
    return this.#seatKey;
  }

  remove() {
    this.present = false;
    this.#seatKey = undefined;
  }
}

export default Player;
