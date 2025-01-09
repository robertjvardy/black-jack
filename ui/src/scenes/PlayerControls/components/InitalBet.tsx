import { usePlayerControlsContext } from "../../../context/PlayerContext";
import { BET_OPTION_MAP } from "../../../shared/constants";
import Chip from "../../../components/Chip";
import styles from "./initialBets.module.scss";

const InitialBet = ({
  currentBet,
  isReady,
}: {
  currentBet?: number;
  isReady: boolean;
}) => {
  const {
    actions: { placeBet, cancelBet, readyUp },
  } = usePlayerControlsContext();

  return (
    <div className={styles["inital-bet"]}>
      {currentBet ? (
        <>
          {isReady && (
            <div className={styles.title}>
              Waiting for the round to start...
            </div>
          )}
          <div className={styles["control-content"]}>
            <div>Your bet:</div>
            <div className={styles.bet}>
              {BET_OPTION_MAP.filter((chip) => chip.value === currentBet).map(
                (chip) => (
                  <Chip
                    key={chip.value}
                    value={chip.value}
                    color={chip.color}
                    onClick={() => placeBet(chip.value)}
                    size={6}
                  />
                )
              )}
            </div>
            {!isReady && (
              <div className={styles["ready-up-container"]}>
                <button className={styles.cancel} onClick={cancelBet}>
                  Cancel Bet
                </button>
                <button className={styles.ready} onClick={readyUp}>
                  Ready Up
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>Place your bet:</div>

          <div className={styles["bet-options"]}>
            {BET_OPTION_MAP.map((chip, k) => (
              <Chip
                isClickable
                key={k}
                value={chip.value}
                color={chip.color}
                onClick={() => placeBet(chip.value)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InitialBet;
