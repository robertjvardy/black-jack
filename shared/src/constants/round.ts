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
