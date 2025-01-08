import { useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { useBaseContext } from "../../context/BaseContext";
import {
  fetchSeatIndex,
  resetLocalStorage,
} from "../../context/localStorageUtils";
import { useEffect } from "react";

const Join = () => {
  const navigate = useNavigate();
  const seatIndex = fetchSeatIndex();

  useEffect(() => {
    if (seatIndex) {
      navigate("/playerControls");
    }
  }, [seatIndex, navigate]);

  return (
    <div>
      <h2>Theres a game in progress!</h2>
      <div className={styles["btn-container"]}>
        <button
          className={styles["join-btn"]}
          onClick={() => navigate("seatAssignment")}
        >
          Join Table
        </button>
        <button
          className={styles["table-btn"]}
          onClick={() => navigate("/table")}
        >
          View the Table
        </button>
      </div>
    </div>
  );
};

const Start = () => {
  const { actions } = useBaseContext();
  return (
    <div>
      <h2>You're the first one here!</h2>

      <button
        className={styles["start-btn"]}
        onClick={() => actions.startGame()}
      >
        Start a Game
      </button>
    </div>
  );
};

const Landing = () => {
  const { gameState } = useBaseContext();

  return (
    <div className={styles.container}>
      <h1>Welcome to Black Jack</h1>
      <div className={styles.options}>
        {gameState.started && <Join />}
        {!gameState.started && <Start />}
        <button
          className={styles["clear-btn"]}
          onClick={() => resetLocalStorage()}
        >
          Reset Local Storage
        </button>
      </div>
    </div>
  );
};

export default Landing;
