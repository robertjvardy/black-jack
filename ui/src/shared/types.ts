import { ROUND_STATUS_MAP } from "./constants";

export type PlayerIndexType = 0 | 1 | 2 | 3 | 4 | 5;
export type CardSuitType = "C" | "D" | "H" | "S";
export type CardOrderType =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type CardType = { order: CardOrderType; suit: CardSuitType };

export type HandType = { cards: CardType[] };

export type PlayerType = {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  ready: boolean;
  hand: HandType;
};

export type RoundStatusValuesType =
  (typeof ROUND_STATUS_MAP)[keyof typeof ROUND_STATUS_MAP];

export type RoundStateType = {
  status: RoundStatusValuesType;
  players: PlayerIndexType[];
};

export type GameStateType = {
  started: boolean;
  dealer: HandType;
  players: PlayerType[];
  currentRound: RoundStateType;
};
