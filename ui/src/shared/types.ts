export type PlayerType = {
  index: number;
  present: boolean;
};

export type GameStateType = {
  started: boolean;
  players: PlayerType[];
};
