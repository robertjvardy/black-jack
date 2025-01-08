import { HAND_STATUS_MAP } from "./constants";

export type PlayerIndexType = 0 | 1 | 2 | 3 | 4 | 5;

export type PlayerType = {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  ready: boolean;
};

export type HandStatusValuesType =
  (typeof HAND_STATUS_MAP)[keyof typeof HAND_STATUS_MAP];

export type HandStateType = {
  status: HandStatusValuesType;
  players: PlayerIndexType[];
};

export type GameStateType = {
  started: boolean;
  players: PlayerType[];
  currentHand: HandStateType;
};
