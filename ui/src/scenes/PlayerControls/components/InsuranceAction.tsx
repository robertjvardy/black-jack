import { GameStateType } from "shared-resources";
import { usePlayerControlsContext } from "../../../context/PlayerContext";
import styles from "./insuranceActions.module.scss";

const InsuranceActions = ({
  gameState,
  seatIndex,
}: {
  gameState: GameStateType;
  seatIndex: number;
}) => {
  const currentPlayer = gameState.players[seatIndex];
  const isOptionSelected = currentPlayer.insuranceAccepted !== undefined;
  const { actions } = usePlayerControlsContext();
  const { insuranceSelection } = actions;
  return (
    <div className={styles.container}>
      <h3>{isOptionSelected ? "Waiting" : "Take insurance?"}</h3>
      {!isOptionSelected && (
        <div className={styles["btn-container"]}>
          <button
            className={styles.reject}
            onClick={() => insuranceSelection(false)}
          >
            Reject
          </button>
          <button
            className={styles.accept}
            onClick={() => insuranceSelection(true)}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

export default InsuranceActions;
