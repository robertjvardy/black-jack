import { HandType } from "./hand";
import { PlayerType } from "./player";
import { RoundStateType } from "./round";

export type GameStateType = {
  started: boolean;
  dealer: HandType;
  players: PlayerType[];
  currentRound: RoundStateType;
};
