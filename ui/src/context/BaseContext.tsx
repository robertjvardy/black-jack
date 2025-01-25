import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import {
  CardsDealtIndexType,
  CardsDealtType,
  DealingToType,
  GameStateType,
  PlayerType,
} from "../shared/types";
import { useNavigate } from "react-router";
import {
  fetchSeatIndex,
  fetchSeatKey,
  resetLocalStorage,
  storeSeatIndex,
  storeSeatKey,
} from "./localStorageUtils";
import {
  API_ADDRESS,
  InitialDeal,
  ROUND_STATUS_MAP,
} from "../shared/constants";

export type BaseContextType = {
  socket?: Socket;
  gameState: GameStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Record<string, any>;
  dealingTo: DealingToType;
  cardsDealt: CardsDealtType[];
};

const defaultCardsDealt: CardsDealtType[] = [0, 0, 0, 0, 0, 0, 0];

const defaultGameState = {
  started: false,
  dealer: { cards: [] },
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
  dealingTo: null,
  cardsDealt: defaultCardsDealt,
});

export const useBaseContext = () => {
  return useContext(BaseContext);
};

const BaseProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [gameState, setGameState] = useState<GameStateType>(defaultGameState);
  const [dealingTo, setDealingTo] = useState<DealingToType>(InitialDeal);
  const [cardsDealt, setCardsDealt] =
    useState<CardsDealtType[]>(defaultCardsDealt);

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

    const updateInitialDeal = () => {
      console.log("Initial Deal");
      setDealingTo(InitialDeal);
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
      socket.on("initial-deal", updateInitialDeal);
      socket.on("seat-key-validated", updateSeatKey);
      socket.on("seat-key-denied", handleSeatKeyDenied);
      socket.on("clear-local-storage", handleClearLocalStorage);
    }
  }, [socket, navigate]);

  useEffect(() => {
    console.log(cardsDealt);
  }, [cardsDealt]);

  useEffect(() => {
    const participatingPlayers = gameState.players.filter((player) =>
      gameState.currentRound.players.includes(player.index)
    );
    const updateCardsDealt = (
      index: CardsDealtIndexType,
      newCardsDealt: CardsDealtType
    ) => {
      const updatedCardsDealt = cardsDealt;
      updatedCardsDealt[index] = newCardsDealt;
      setCardsDealt(updatedCardsDealt);
      console.log(index, updatedCardsDealt);
    };

    if (dealingTo === InitialDeal) {
      console.log("dealing..........................");
      // Deal first card to players
      participatingPlayers.forEach((player, index) => {
        setTimeout(() => {
          updateCardsDealt(player.index, 1);
        }, index * 1000);
      });
      // Deal to the Dealer
      setTimeout(() => {
        updateCardsDealt(6, 1);
      }, (participatingPlayers.length + 1) * 1000);
      // Deal second card to players
      participatingPlayers.forEach((player, index) => {
        setTimeout(() => {
          updateCardsDealt(player.index, 2);
        }, (participatingPlayers.length + 1 + index) * 1000);
      });
      // Deal second card to the Dealer
      setTimeout(() => {
        updateCardsDealt(6, 2);
      }, (participatingPlayers.length * 2 + 2) * 1000);
      // End the initial deal state
      handleUpdateDealingTo(null);
    }
  }, [
    cardsDealt,
    dealingTo,
    gameState.currentRound.players,
    gameState.players,
  ]);

  const handleUpdateDealingTo = (dealingToIndex: DealingToType) => {
    setDealingTo(dealingToIndex);
  };

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
    updateDealingTo: handleUpdateDealingTo,
  };

  return socket ? (
    <BaseContext.Provider
      value={{ socket, gameState, actions, dealingTo, cardsDealt: cardsDealt }}
    >
      {children}
    </BaseContext.Provider>
  ) : null;
};

export default BaseProvider;
