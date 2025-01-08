import styles from "./player.module.scss";
import { useBaseContext } from "../../../context/BaseContext";
import { BET_OPTION_MAP, HAND_STATUS_MAP } from "../../../shared/constants";
import Chip from "../../../components/Chip";

const Hand = ({ active }: { active: boolean }) => {
  return active ? <div>Cards</div> : null;
};

const Player = ({
  index,
  present,
  holdings,
  currentBet,
  ready,
}: {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
  ready: boolean;
}) => {
  const { gameState } = useBaseContext();
  const {
    currentHand: { status },
  } = gameState;
  const isPendingBet = status === HAND_STATUS_MAP.pendingBets;
  const readyText = ready && "Ready!";
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPendingBet ? readyText : <Hand active={present && !!currentBet} />}
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
              {currentBet ? (
                BET_OPTION_MAP.filter((chip) => chip.value === currentBet).map(
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
                )
              ) : (
                <span>-</span>
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
