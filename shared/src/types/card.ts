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

export const TWENTY_ONE = 21;

export type CardType = { order: CardOrderType; suit: CardSuitType };
