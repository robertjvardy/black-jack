import { Navigate, Route, Routes } from "react-router";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { PlayerType } from "../../shared/types";
import { useGameContext } from "../../context/SocketContext";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  const {
    actions: { assignPlayer },
  } = useGameContext();
  const handleClick = () => assignPlayer(index);
  return (
    <button
      disabled={present}
      className={classNames(styles.seat, { [styles.disabled]: present })}
      onClick={handleClick}
    >
      {index + 1}
    </button>
  );
};

const SeatAssignment = () => {
  const { gameState } = useGameContext();
  return (
    <div className={styles.container}>
      <h1>Select a Seat</h1>
      <div className={styles["seat-selection-container"]}>
        {gameState.players.map((player: PlayerType) => (
          <Seat {...player} key={player.index} />
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
