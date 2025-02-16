import { HandType } from "./hand";

export type PlayerIndexType = 0 | 1 | 2 | 3 | 4 | 5;

export type PlayerType = {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
  options: any;
  ready: boolean;
  hand: HandType;
  insuranceAccepted?: boolean;
};
