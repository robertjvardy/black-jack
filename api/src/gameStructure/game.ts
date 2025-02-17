import Round from "./round";
import Player from "./player";
import Shoe from "./shoe";
import Hand from "./hand";
import { updateGameState } from "..";
import Card from "./card";
import {
  PlayerIndexType,
  ROUND_STATUS_MAP,
  TWENTY_ONE,
} from "shared-resources";

export type GameStateType = {
  started: boolean;
  dealer: Hand;
  players: Player[];
  currentRound: Round;
};

const defaultGameState = {
  started: false,
  dealer: new Hand(),
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

  removePlayer({
    seatIndex,
    seatKey,
  }: {
    seatIndex: PlayerIndexType;
    seatKey: string;
  }) {
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
    if (this.checkPlayerReadyStatus()) {
      this.startRound();
      updateGameState();
      this.dealCards();
    }
    updateGameState();
  }

  onCancelBet(index: PlayerIndexType) {
    const player = this.gameState.players[index];
    player.cancelBet();
  }

  checkPlayerReadyStatus() {
    const { players } = this.gameState;
    return players.every((player) => !player.present || player.ready);
  }

  checkPlayerInsuranceStatus() {
    const { players, currentRound } = this.gameState;
    const participatingPlayers = players.filter((player) =>
      currentRound.players.includes(player.index)
    );
    return participatingPlayers.every((player) =>
      player.isInsuranceSelectionMade()
    );
  }

  onPlayerReady(index: PlayerIndexType) {
    const player = this.gameState.players[index];
    player.readyUp();
    if (this.checkPlayerReadyStatus()) {
      this.startRound();
      updateGameState();
      this.dealCards();
    }
    updateGameState();
  }

  dealCards() {
    const { currentRound, players, dealer } = this.gameState;
    const participatingPlayers = currentRound.players.reverse();
    const positionsToDeal = participatingPlayers.length;
    const delay = 1000;

    participatingPlayers.forEach((playerIdx, index) => {
      setTimeout(() => {
        players[playerIdx].addCard(this.shoe.pullCard());
        updateGameState();
      }, index * delay);
    });

    setTimeout(() => {
      dealer.addCard(new Card("10", "C"));
      // dealer.addCard(this.shoe.pullCard());
      updateGameState();
    }, positionsToDeal * delay);

    participatingPlayers.forEach((playerIdx, index) => {
      setTimeout(() => {
        players[playerIdx].addCard(this.shoe.pullCard());
        updateGameState();
      }, (positionsToDeal + 1 + index) * delay);
    });

    setTimeout(() => {
      dealer.addCard(new Card("A", "C"));
      // dealer.addCard(this.shoe.pullCard());
      this.checkForInsuranceEligibility();
      updateGameState();
    }, (positionsToDeal * 2 + 1) * delay);
  }

  startRound() {
    this.gameState.currentRound.startRound();
  }

  resetRound() {
    this.gameState.currentRound.restartRound();
    this.gameState.dealer.reset();
    this.gameState.players.forEach((player) => player.reset());
  }

  checkForInsuranceEligibility() {
    this.gameState.currentRound.checkForInsuranceEligibility(
      this.gameState.dealer
    );
  }

  insuranceSelection(index: number, value: boolean) {
    this.gameState.players[index].insuranceSelection(value);
    if (this.checkPlayerInsuranceStatus()) {
      this.evaluateInsurance();
    }
    updateGameState();
  }

  evaluateInsurance() {
    const dealerBlackJack = this.gameState.dealer.isBlackJack();
    const presentPlayers = this.gameState.players.filter(
      (player) => player.present
    );

    if (dealerBlackJack) {
      presentPlayers.forEach((player) => {
        player.settleInsurance(dealerBlackJack);
        player.settleAllHands(TWENTY_ONE);
      });
      // TODO transition to payout here
      // TODO delay the round reset so the UI can show dealer card and payout
      this.resetRound();
    } else {
      this.gameState.currentRound.setStatus(
        ROUND_STATUS_MAP.dealerBlackJackCheck
      );
      updateGameState();
    }
  }
}

export default Game;
