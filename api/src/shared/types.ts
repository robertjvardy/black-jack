import { ExtendedError } from "socket.io";

export type NextType = (err?: ExtendedError) => void;
