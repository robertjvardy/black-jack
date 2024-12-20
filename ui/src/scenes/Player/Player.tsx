import { Navigate, Route, Routes } from "react-router";
import { useFetchGameStateQuery } from "../../queries";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../components/Loader";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { PlayerType } from "../../shared/types";
import { useSocket } from "../../context/SocketContext";
import invariant from "tiny-invariant";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  const socket = useSocket();
  invariant(socket, "Socket is null");
  const handleClick = () => socket.emit("assign-player", { index });
  return (
    <div
      className={classNames(styles.seat, { [styles.disabled]: present })}
      onClick={handleClick}
    >
      {index + 1}
    </div>
  );
};

const SeatAssignment = () => {
  const { data } = useFetchGameStateQuery();
  const [playerState, setPlayerState] = useState<PlayerType[]>(data.players);
  const socket = useSocket();
  invariant(socket, "Socket is null");

  useEffect(() => {
    const updateState = (state: PlayerType[]) => {
      console.log("Player State: ", state);
      setPlayerState(state);
    };
    socket.on("player-update", updateState);
    return () => {
      socket.off("player-update", updateState);
    };
  }, [socket]);

  return (
    <div className={styles.container}>
      <h1>Select a Seat</h1>
      <div className={styles["seat-selection-container"]}>
        {playerState.map((player: PlayerType) => (
          <Seat {...player} />
        ))}
      </div>
    </div>
  );
};

const Controls = () => {
  return <div></div>;
};

const Player = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="seatAssignment" />} />
      <Route
        path="seatAssignment"
        element={
          <Suspense fallback={<Loader />}>
            <SeatAssignment />
          </Suspense>
        }
      />
      <Route path="controls" element={<Controls />} />
    </Routes>
  );
};

export default Player;
