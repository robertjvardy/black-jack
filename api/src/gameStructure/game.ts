import Player from "./player";

export type GameStateType = {
  started: boolean;
  players: Player[];
};

const defaultGameState = {
  started: false,
  players: [],
};

class Game {
  private gameState: GameStateType = defaultGameState;

  startGame() {
    this.gameState.started = true;
  }

  restartGame() {
    this.gameState = { ...defaultGameState, started: true };
  }

  isStarted() {
    return this.gameState.started;
  }

  fetchGameState() {
    return this.gameState;
  }
}

export default Game;
