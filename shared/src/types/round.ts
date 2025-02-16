import { PLAYER_HAND_RESULT_MAP, ROUND_STATUS_MAP } from "../constants/round";
import { PlayerIndexType } from "./player";

export type RoundStatusValuesType =
  (typeof ROUND_STATUS_MAP)[keyof typeof ROUND_STATUS_MAP];

export type PlayerHandResultType =
  (typeof PLAYER_HAND_RESULT_MAP)[keyof typeof PLAYER_HAND_RESULT_MAP];

export type RoundStateType = {
  status: RoundStatusValuesType;
  players: PlayerIndexType[];
};
