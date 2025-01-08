import styles from "./player.module.scss";
import { useBaseContext } from "../../../context/BaseContext";
import { BET_OPTION_MAP, HAND_STATUS_MAP } from "../../../shared/constants";
import Chip from "../../../components/Chip";

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
        {isPendingBet ? "test" : "cards here"}
      </div>
      <div className={styles.footer}>
        {present ? (
          <>
            <div className={styles.info}>
              <div className={styles["player-label"]}>{`Player ${
                index + 1
              }`}</div>
              <div>{holdings}</div>
            </div>
            <div className={styles.bet}>
              {BET_OPTION_MAP.filter((chip) => chip.value === currentBet).map(
                (chip) => (
                  <div>
                    <Chip
                      key={chip.value}
                      value={chip.value}
                      color={chip.color}
                      size={3}
                    />
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <div className={styles["empty-seat"]}>Empty Seat</div>
        )}
      </div>
    </div>
  );
};

export default Player;
