import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import Hand from "./hand";
import { PLAYER_HAND_RESULT_MAP } from "../shared/constants";

export type PlayerType = typeof Player;

class Player {
  #seatKey?: string;
  index: number;
  present: boolean;
  ready: boolean = false;
  holdings: number = 0;
  currentBet?: number;
  options: any; // TODO create options for the players available actions
  hand: Hand = new Hand();
  splitHands: Hand[] = [];
  insuranceAccepted?: boolean;

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
    this.ready = false;
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

  cancelBet() {
    if (this.currentBet) {
      this.holdings = this.holdings + this.currentBet;
      this.currentBet = 0;
    } else {
      // TODO throw error
    }
  }

  readyUp() {
    if (this.#seatKey && this.validateSeatKey(this.#seatKey)) {
      this.ready = true;
    } else {
      // TODO throw error
    }
  }

  private settleHand(hand: Hand, dealerTotal: number) {
    var payout = 0;
    if (this.currentBet) {
      switch (hand.evaluateHand(dealerTotal)) {
        case PLAYER_HAND_RESULT_MAP.push:
          payout = this.currentBet;
        case PLAYER_HAND_RESULT_MAP.win:
          payout = this.currentBet * 2;
        case PLAYER_HAND_RESULT_MAP.blackJack:
          payout = this.currentBet * 2.5;
      }
      this.holdings += payout;
    } else {
      // TODO throw error
    }
  }

  settleAllHands(dealerTotal: number) {
    this.settleHand(this.hand, dealerTotal);
    this.splitHands.forEach((hand) => this.settleHand(hand, dealerTotal));
    this.currentBet = 0;
  }

  addCard(card: Card) {
    this.hand.addCard(card);
  }

  insuranceSelection(value: boolean) {
    this.insuranceAccepted = value;
  }

  isInsuranceSelectionMade() {
    return this.insuranceAccepted !== undefined;
  }
}

export default Player;
