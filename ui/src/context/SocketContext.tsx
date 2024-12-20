import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [seatKey, setSeatKey] = useState<string>();

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
    }
  }, [socket]);

  return socket ? (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  ) : null;
};

export default SocketProvider;
