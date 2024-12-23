import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { GameStateType } from "../shared/types";

const SOCKET_URL = `${import.meta.env.VITE_API_BASE_URL}/player`;

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
  gameState,
}: {
  children: ReactNode;
  seatKey: string;
  gameState: GameStateType;
}) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
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

  const actions = {};

  return socket ? (
    <PlayerControlsContext.Provider value={{ socket, actions }}>
      {children}
    </PlayerControlsContext.Provider>
  ) : null;
};

export default PlayerControlsProvider;
