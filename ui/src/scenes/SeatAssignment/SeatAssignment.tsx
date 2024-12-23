import classNames from "classnames";
import { useBaseContext } from "../../context/BaseContext";
import { PlayerType } from "../../shared/types";
import styles from "./styles.module.scss";
import { useEffect } from "react";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  const {
    actions: { assignPlayer },
  } = useBaseContext();
  const handleClick = () => {
    assignPlayer(index);
  };
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
  const {
    gameState,
    actions: { verifyUserUnassigned },
  } = useBaseContext();

  useEffect(() => {
    verifyUserUnassigned();
  }, [verifyUserUnassigned]);

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

export default SeatAssignment;
