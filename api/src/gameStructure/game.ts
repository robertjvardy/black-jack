import { PlayerIndiciesType } from "../shared/types";
import Hand from "./hand";
import Player from "./player";

export type GameStateType = {
  started: boolean;
  players: Player[];
  currentHand: Hand;
};

const defaultGameState = {
  started: false,
  players: [
    new Player(0),
    new Player(1),
    new Player(2),
    new Player(3),
    new Player(4),
    new Player(5),
  ],
  currentHand: new Hand(),
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

  fetchPlayerState(index: number) {
    return this.gameState.players[index];
  }

  fetchPlayerPresent(index: number) {
    return this.gameState.players[index].present;
  }

  assignPlayer(index: number) {
    const player = this.gameState.players[index];
    return player.assign();
  }

  removePlayer({ seatIndex, seatKey }: { seatIndex: number; seatKey: string }) {
    const player = this.gameState.players[seatIndex];
    if (!!player) {
      // TODO throw error
    }
    if (player.validateSeatKey(seatKey)) {
      this.gameState.players[seatIndex] = new Player(seatIndex);
    }
  }

  validateSeatKey(key: string): number | undefined {
    const player = this.gameState.players.find((player) =>
      player.validateSeatKey(key)
    );
    return player?.index;
  }

  isTableEmpty() {
    return this.gameState.players.some((player) => player.present);
  }

  isHandInProgress() {
    return this.gameState.currentHand.isHandStarted();
  }

  fetchHandState() {
    return this.gameState.currentHand;
  }

  onPlayerBet(index: PlayerIndiciesType, betAmount: number) {
    const player = this.gameState.players[index];
    player.placeBet(betAmount);
    const hand = this.gameState.currentHand;
    hand.addPlayer(index);
  }
}

export default Game;
