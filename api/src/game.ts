type GameState = {
  started: boolean;
};

let gameState: GameState = {
  started: false,
};

export const checkGameStarted = () => gameState.started;
