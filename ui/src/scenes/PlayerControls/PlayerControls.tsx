import { useEffect } from "react";
import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import PlayerControlsProvider from "../../context/PlayerContext";
import invariant from "tiny-invariant";
import { fetchSeatIndex, fetchSeatKey } from "../../context/localStorageUtils";

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

  invariant(seatKey, "Seat Key is missing in player controls");
  invariant(seatIndex, "Seat Index is missing in player controls");
  const seatIndexDisplay = parseInt(seatIndex) + 1;

  return (
    <div className={styles.content}>
      <PlayerControlsProvider gameState={gameState} seatKey={seatKey}>
        <h1>Player {seatIndexDisplay}</h1>
        <button
          className={styles["leave-btn"]}
          onClick={() => leaveSeat({ seatIndex, seatKey })}
        >
          Leave Game
        </button>
      </PlayerControlsProvider>
    </div>
  );
};

const PlayerControlsWrapper = () => {
  const {
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
        <PlayerControls seatIndex={seatIndex} seatKey={seatKey} />
      )}
    </div>
  );
};

export default PlayerControlsWrapper;
