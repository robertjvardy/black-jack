import { CardOrderType, CardSuitType } from "./types";

export const API_ADDRESS =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const ROUND_STATUS_MAP = {
  pendingBets: "PENDING_BETS",
  dealing: "DEALING",
  insuranceCheck: "INSUREANCE_CHECK",
  playerAction: "PLAYER_ACTION",
  dealerAction: "DEALER_ACTION",
  payout: "PAYOUT",
} as const;

export const BET_OPTION_MAP = [
  { value: 5, color: "red" },
  { value: 10, color: "orange" },
  { value: 25, color: "green" },
  { value: 50, color: "blue" },
  { value: 100, color: "black" },
];

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
