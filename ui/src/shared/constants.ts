export const API_ADDRESS =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const HAND_STATUS_MAP = {
  pendingBets: "PENDING_BETS",
  dealing: "DEALING",
  insuranceCheck: "INSUREANCE_CHECK",
  playerAction: "PLAYER_ACTION",
  dealerAction: "DEALER_ACTION",
  payout: "PAYOUT",
} as const;
