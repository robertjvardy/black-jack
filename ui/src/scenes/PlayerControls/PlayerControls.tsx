import { useEffect } from "react";
import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import PlayerControlsProvider from "../../context/PlayerContext";
import invariant from "tiny-invariant";
import { fetchSeatIndex, fetchSeatKey } from "../../context/localStorageUtils";
import { ROUND_STATUS_MAP } from "../../shared/constants";
import InitialBet from "./components/InitalBet";
import { PlayerIndexType } from "../../shared/types";
import InProgressActions from "./components/InProgressActions";

const PlayerControls = ({
  seatIndex,
  seatKey,
}: {
  seatIndex: string;
  seatKey: string;
}) => {
  const {
    gameState,
    actions: { leaveSeat },
  } = useBaseContext();
  const { currentRound, players } = gameState;

  invariant(seatKey, "Seat Key is missing in player controls");
  invariant(seatIndex, "Seat Index is missing in player controls");
  const index = parseInt(seatIndex);
  const seatIndexDisplay = index + 1;
  const roundInProgress = currentRound.status !== ROUND_STATUS_MAP.pendingBets;
  const isIncludedInCurrentRound = currentRound.players.includes(
    parseInt(seatIndex) as PlayerIndexType
  );
  const { currentBet, ready } = players[index];

  return (
    <div className={styles.content}>
      <h1>Player {seatIndexDisplay}</h1>
      <div className={styles.controls}>
        {roundInProgress && (
          <InProgressActions active={isIncludedInCurrentRound} />
        )}
        {!roundInProgress && (
          <InitialBet currentBet={currentBet} isReady={ready} />
        )}
      </div>
      <div className={styles.footer}>
        <button
          className={styles["leave-btn"]}
          onClick={() => leaveSeat({ seatIndex, seatKey })}
        >
          Leave Game
        </button>
      </div>
    </div>
  );
};

const PlayerControlsWrapper = () => {
  const {
    gameState,
    actions: { validateSeatKey },
  } = useBaseContext();
  const seatIndex = fetchSeatIndex();
  const seatKey = fetchSeatKey();
  const renderPlayerControls = !!seatIndex && seatKey;

  useEffect(() => {
    validateSeatKey();
  }, [validateSeatKey]);

  return (
    <div className={styles["controls-container"]}>
      {renderPlayerControls && (
        <PlayerControlsProvider gameState={gameState} seatKey={seatKey}>
          <PlayerControls seatIndex={seatIndex} seatKey={seatKey} />
        </PlayerControlsProvider>
      )}
    </div>
  );
};

export default PlayerControlsWrapper;
