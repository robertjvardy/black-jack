import { CardSuitType, CardOrderType } from "./types";

export const ROUND_STATUS_MAP = {
  pendingBets: "PENDING_BETS",
  dealing: "DEALING",
  insuranceCheck: "INSURANCE_CHECK",
  dealerBlackJackCheck: "DEALER_BLACKJACK_CHECK",
  playerAction: "PLAYER_ACTION",
  dealerAction: "DEALER_ACTION",
  payout: "PAYOUT",
} as const;

export const PLAYER_HAND_RESULT_MAP = {
  win: "WIN",
  loss: "LOSS",
  push: "PUSH",
  blackJack: "BLACK_JACK",
} as const;

export const TWENTY_ONE = 21;

export const CARD_SUITS: CardSuitType[] = ["C", "D", "H", "S"];
export const CARD_ORDERS: CardOrderType[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
