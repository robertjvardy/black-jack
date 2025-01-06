import styles from "./player.module.scss";
import { useBaseContext } from "../../../context/BaseContext";
import { HAND_STATUS_MAP } from "../../../shared/constants";

const Player = ({
  index,
  present,
  holdings,
  currentBet,
}: {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
}) => {
  const { gameState } = useBaseContext();
  const {
    currentHand: { status },
  } = gameState;
  const isPendingBet = status === HAND_STATUS_MAP.pendingBets;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPendingBet ? currentBet : "cards here"}
      </div>
      <div className={styles.footer}>
        <div className={styles["player-label"]}>
          {present ? `Player ${index + 1}` : "EMPTY SEAT"}
        </div>
        <div>{present ? `$${holdings}` : "-"}</div>
      </div>
    </div>
  );
};

export default Player;
