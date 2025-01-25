import styles from "./player.module.scss";
import { useBaseContext } from "../../../context/BaseContext";
import { BET_OPTION_MAP, ROUND_STATUS_MAP } from "../../../shared/constants";
import Chip from "../../../components/Chip";
import { HandType } from "../../../shared/types";
import Hand from "./Hand";

const Player = ({
  index,
  present,
  holdings,
  currentBet,
  ready,
  hand,
  hideOverflow,
}: {
  index: number;
  present: boolean;
  holdings: number;
  currentBet?: number;
  ready: boolean;
  hand: HandType;
  hideOverflow: boolean;
}) => {
  const { gameState } = useBaseContext();
  const {
    currentRound: { status },
  } = gameState;
  const isPendingBet = status === ROUND_STATUS_MAP.pendingBets;
  const readyText = ready && "Ready!";
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isPendingBet ? (
          <div className={styles["ready-text"]}>{readyText}</div>
        ) : (
          <Hand
            active={present && !!currentBet}
            cards={hand.cards}
            hideOverflow={hideOverflow}
          />
        )}
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
