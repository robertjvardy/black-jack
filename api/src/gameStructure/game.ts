import { PlayerIndexType } from "../shared/types";
import Round from "./round";
import Player from "./player";
import Shoe from "./shoe";

export type GameStateType = {
  started: boolean;
  players: Player[];
  currentRound: Round;
};

const defaultGameState = {
  started: false,
  dealer: [],
  players: [
    new Player(0),
    new Player(1),
    new Player(2),
    new Player(3),
    new Player(4),
    new Player(5),
  ],
  currentRound: new Round(),
};

class Game {
  private gameState: GameStateType = defaultGameState;
  private shoe = new Shoe();

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

  isRoundInProgress() {
    return this.gameState.currentRound.isRoundStarted();
  }

  fetchRoundState() {
    return this.gameState.currentRound;
  }

  onPlayerBet(index: PlayerIndexType, betAmount: number) {
    const player = this.gameState.players[index];
    player.placeBet(betAmount);
    const round = this.gameState.currentRound;
    round.addPlayer(index);
  }

  onCancelBet(index: PlayerIndexType) {
    const player = this.gameState.players[index];
    player.cancelBet();
  }

  checkPlayerReadyStatus() {
    const { players } = this.gameState;
    return players.every((player) => !player.present || player.ready);
  }

  onPlayerReady(index: PlayerIndexType) {
    const player = this.gameState.players[index];
    player.readyUp();
  }

  dealCards() {
    const { currentRound, players } = this.gameState;
    currentRound.players.forEach((playerIdx) => {
      players[playerIdx].addCard(this.shoe.pullCard());
    });
  }

  startRound() {
    this.gameState.currentRound.startRound();
  }
}

export default Game;
