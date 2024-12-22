import classNames from "classnames";
import { useGameContext } from "../../context/SocketContext";
import { PlayerType } from "../../shared/types";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router";

const Seat = ({ index, present }: { index: number; present: boolean }) => {
  const {
    actions: { assignPlayer },
  } = useGameContext();
  const navigate = useNavigate();
  const handleClick = () => {
    assignPlayer(index);
    navigate("/playerControls");
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

export default SeatAssignment;
