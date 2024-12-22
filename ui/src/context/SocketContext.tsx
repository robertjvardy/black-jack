import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { GameStateType, PlayerType } from "../shared/types";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

export type GameContextType = {
  socket?: Socket;
  gameState: GameStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Record<string, any>;
};

const defaultGameState = {
  started: false,
  players: [],
};

// TODO create types for this and export
const defaultActions = {
  startGame: undefined,
  assignPlayer: undefined,
};

const SocketContext = createContext<GameContextType>({
  gameState: defaultGameState,
  actions: defaultActions,
});

export const useGameContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [gameState, setGameState] = useState<GameStateType>(defaultGameState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seatKey, setSeatKey] = useState<string>();
  // TODO implement state for player index

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    const updatePlayerState = (state: PlayerType[]) => {
      console.log("Player State: ", state);
      setGameState((prevState) => ({ ...prevState, players: state }));
    };

    const updateGameState = (state: GameStateType) => {
      console.log("Game State: ", state);
      setGameState(state);
    };

    if (socket) {
      // TODO remove after dev
      socket.on("connect", () => {
        console.log(`connect ${socket.id}`);
      });
      // TODO remove after dev
      socket.on("disconnect", () => {
        console.log(`disconnect`);
      });
      socket.on("seat-key", (data) => {
        console.log(`seat-key`, data);
        setSeatKey(data.seatKey);
      });
      socket.on("player-update", updatePlayerState);
      socket.on("update", updateGameState);
    }
  }, [socket]);

  const handleStartGame = () => socket?.emit("start-game");
  const handleAssignPlayer = (index: number) =>
    socket?.emit("assign-player", { index });

  const actions = {
    startGame: handleStartGame,
    assignPlayer: handleAssignPlayer,
  };

  return socket ? (
    <SocketContext.Provider value={{ socket, gameState, actions }}>
      {children}
    </SocketContext.Provider>
  ) : null;
};

export default SocketProvider;
