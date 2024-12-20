import { Navigate, Route, Routes } from "react-router";
import { useAssignSeatMutation, useFetchGameStateQuery } from "../../queries";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  const { mutate } = useAssignSeatMutation();
  const handleClick = () => mutate(index);
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
  return (
    <div className={styles.container}>
      <h1>Select a Seat</h1>

      <div className={styles["seat-selection-container"]}>
        {data.players.map((player) => (
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
