export type PlayerType = typeof Player;

class Player {
  index: number;

  constructor(index: number) {
    this.index = index;
  }
}

export default Player;
