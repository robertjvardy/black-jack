import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { GameStateType, PlayerType } from "../shared/types";
import { useNavigate } from "react-router";
import {
  fetchSeatIndex,
  fetchSeatKey,
  resetLocalStorage,
  storeSeatIndex,
  storeSeatKey,
} from "./localStorageUtils";
import { API_ADDRESS } from "../shared/constants";

export type BaseContextType = {
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

const BaseContext = createContext<BaseContextType>({
  gameState: defaultGameState,
  actions: defaultActions,
});

export const useBaseContext = () => {
  return useContext(BaseContext);
};

const BaseProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [gameState, setGameState] = useState<GameStateType>(defaultGameState);

  const navigate = useNavigate();

  useEffect(() => {
    const socketInstance = io(API_ADDRESS, {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
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

    const updateSeatKey = ({ index }: { index: number }) => {
      console.log("Seat Index: ", index);
      storeSeatIndex(index);
    };

    const handleSeatKeyDenied = () => {
      console.log("Seat Key Denied");
      navigate("/home/seatAssignment");
      resetLocalStorage();
    };

    const handleClearLocalStorage = () => {
      console.log("Local Storage Cleared");
      resetLocalStorage();
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
      socket.on("seat-key", ({ seatKey, seatIndex }) => {
        console.log(`seat key`, seatKey);
        storeSeatKey(seatKey);
        storeSeatIndex(seatIndex);
        navigate("/playerControls");
      });
      socket.on("player-update", updatePlayerState);
      socket.on("update", updateGameState);
      socket.on("seat-key-validated", updateSeatKey);
      socket.on("seat-key-denied", handleSeatKeyDenied);
      socket.on("clear-local-storage", handleClearLocalStorage);
    }
  }, [socket, navigate]);

  const handleStartGame = useCallback(() => {
    socket?.emit("start-game");
  }, [socket]);
  const handleAssignPlayer = useCallback(
    (index: number) => socket?.emit("assign-player", { index }),
    [socket]
  );
  const handleValidateSeatKey = useCallback(() => {
    const seatKey = fetchSeatKey();
    if (!seatKey) {
      console.log("here", seatKey);
      navigate("/home");
    }
    socket?.emit("validate-seat-key", { seatKey });
  }, [navigate, socket]);

  const handleVerifyUserUnassigned = useCallback(() => {
    const seatKey = fetchSeatKey();
    const seatIndex = fetchSeatIndex();
    if (seatKey && seatIndex) {
      navigate("/playerControls");
    } else {
      navigate("/home/seatAssignment");
    }
  }, [navigate]);

  const handleLeaveSeat = useCallback(
    ({ seatIndex, seatKey }: { seatIndex: number; seatKey: string }) => {
      socket?.emit("leave-seat", { seatIndex, seatKey });
      navigate("/home");
    },
    [socket, navigate]
  );

  const actions = {
    startGame: handleStartGame,
    assignPlayer: handleAssignPlayer,
    validateSeatKey: handleValidateSeatKey,
    verifyUserUnassigned: handleVerifyUserUnassigned,
    leaveSeat: handleLeaveSeat,
  };

  return socket ? (
    <BaseContext.Provider value={{ socket, gameState, actions }}>
      {children}
    </BaseContext.Provider>
  ) : null;
};

export default BaseProvider;
