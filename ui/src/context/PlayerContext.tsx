import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { API_ADDRESS } from "../shared/constants";
import {
  BetDto,
  GameStateType,
  InsuranceSelection,
  playerEventNames,
} from "shared-resources";

const PLAYER_SOCKET_URL = `${API_ADDRESS}/player`;

export type PlayerControlsContextType = {
  socket?: Socket;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: Record<string, any>;
};

const PlayerControlsContext = createContext<PlayerControlsContextType>({
  actions: {},
});

export const usePlayerControlsContext = () => {
  return useContext(PlayerControlsContext);
};

const PlayerControlsProvider = ({
  children,
  seatKey,
}: {
  children: ReactNode;
  seatKey: string;
  gameState: GameStateType;
}) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketInstance = io(PLAYER_SOCKET_URL, {
      transports: ["websocket"],
      auth: { token: seatKey },
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [seatKey]);

  useEffect(() => {
    if (socket) {
      // TODO remove after dev
      socket.on("connect", () => {
        console.log(`connect ${socket.id}`);
      });
      // TODO remove after dev
      socket.on("disconnect", () => {
        console.log(`disconnect`);
      });
    }
  }, [socket]);

  const handlePlaceBet = (betAmount: number) => {
    socket?.emit(playerEventNames.PLACE_BET, new BetDto(betAmount));
  };

  const handlePlayerCancel = () => {
    socket?.emit(playerEventNames.CANCEL_BET);
  };

  const handlePlayerReady = () => {
    socket?.emit(playerEventNames.PLAYER_READY);
  };

  const handleInsuranceSelection = (value: boolean) =>
    socket?.emit(
      playerEventNames.INSURANCE_SELECTION,
      new InsuranceSelection(value)
    );

  const actions = {
    placeBet: handlePlaceBet,
    cancelBet: handlePlayerCancel,
    readyUp: handlePlayerReady,
    insuranceSelection: handleInsuranceSelection,
  };

  return socket ? (
    <PlayerControlsContext.Provider value={{ socket, actions }}>
      {children}
    </PlayerControlsContext.Provider>
  ) : null;
};

export default PlayerControlsProvider;
