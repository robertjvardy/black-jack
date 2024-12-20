export type PlayerType = typeof Player;

class Player {
  index: number;
  present: boolean;

  constructor(index: number) {
    this.index = index;
    this.present = false;
  }

  assign() {
    this.present = true;
  }

  remove() {
    this.present = false;
  }
}

export default Player;
