import { ExtendedError } from "socket.io";

export type PlayerIndiciesType = 0 | 1 | 2 | 3 | 4 | 5;

export type NextType = (err?: ExtendedError) => void;
