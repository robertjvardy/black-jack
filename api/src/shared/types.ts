import { ExtendedError } from "socket.io";
import { HAND_STATUS_MAP } from "./constants";

export type PlayerIndexType = 0 | 1 | 2 | 3 | 4 | 5;

export type NextType = (err?: ExtendedError) => void;

export type HandStatusValuesType =
  (typeof HAND_STATUS_MAP)[keyof typeof HAND_STATUS_MAP];
