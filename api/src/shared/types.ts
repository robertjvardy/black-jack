import { ExtendedError } from "socket.io";
import { ROUND_STATUS_MAP } from "./constants";

export type PlayerIndexType = 0 | 1 | 2 | 3 | 4 | 5;

export type NextType = (err?: ExtendedError) => void;

export type RoundStatusValuesType =
  (typeof ROUND_STATUS_MAP)[keyof typeof ROUND_STATUS_MAP];

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
