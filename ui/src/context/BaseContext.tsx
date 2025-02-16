import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate } from "react-router";
import {
  fetchSeatIndex,
  fetchSeatKey,
  resetLocalStorage,
  storeSeatIndex,
  storeSeatKey,
} from "./localStorageUtils";
import { API_ADDRESS } from "../shared/constants";
import {
  baseEventNames,
  GameStateType,
  ROUND_STATUS_MAP,
  SeatIndexDto,
  SeatInfoDto,
} from "shared-resources";
import invariant from "tiny-invariant";

export type BaseContextType = {
  socket?: Socket;
  gameState: GameStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Record<string, any>;
};

const defaultGameState = {
  started: false,
  dealer: { cards: [], total: [0] },
  players: [],
  currentRound: { status: ROUND_STATUS_MAP.pendingBets, players: [] },
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
    const updateGameState = (state: GameStateType) => {
      console.log("Game State: ", state);
      setGameState(state);
    };

    const updateSeatKey = ({ seatIndex }: SeatIndexDto) => {
      console.log("Seat Index: ", seatIndex);
      storeSeatIndex(seatIndex);
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
      socket.on(baseEventNames.SEAT_KEY, ({ seatKey, seatIndex }) => {
        console.log(`seat key`, seatKey);
        storeSeatKey(seatKey);
        storeSeatIndex(seatIndex);
        navigate("/playerControls");
      });
      socket.on(baseEventNames.UPDATE, updateGameState);
      socket.on(baseEventNames.SEAT_KEY_VALIDATED, updateSeatKey);
      socket.on(baseEventNames.SEAT_KEY_DENIED, handleSeatKeyDenied);
      socket.on(baseEventNames.CLEAR_LOCAL_STORAGE, handleClearLocalStorage);
    }
  }, [socket, navigate]);

  const handleStartGame = useCallback(() => {
    socket?.emit(baseEventNames.START_GAME);
  }, [socket]);

  const handleAssignPlayer = useCallback(
    (seatIndex: number) => {
      socket?.emit(baseEventNames.ASSIGN_PLAYER, new SeatIndexDto(seatIndex));
    },
    [socket]
  );

  const handleValidateSeatKey = useCallback(() => {
    const seatKey = fetchSeatKey();
    const seatIndex = fetchSeatIndex();
    invariant(seatIndex, "missing seat index");
    invariant(seatKey, "missing seat key");

    if (!seatKey) {
      navigate("/home");
    }
    socket?.emit(
      baseEventNames.VALIDATE_SEAT_KEY,
      new SeatInfoDto(seatIndex, seatKey)
    );
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
    ({ seatIndex, seatKey }: SeatInfoDto) => {
      socket?.emit(
        baseEventNames.LEAVE_SEAT,
        new SeatInfoDto(seatIndex, seatKey)
      );
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
