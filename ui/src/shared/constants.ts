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
