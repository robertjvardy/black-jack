import { useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { useGameContext } from "../../context/SocketContext";

const Join = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Theres a game in progress!</h2>
      <div className={styles["btn-container"]}>
        <button onClick={() => navigate("seatAssignment")}>Join Table</button>
        <button onClick={() => navigate("/table")}>View the Table</button>
      </div>
    </div>
  );
};

const Start = () => {
  const { actions } = useGameContext();
  return (
    <div>
      <h2>You're the first one here!</h2>

      <button onClick={() => actions.startGame()}>Start a Game</button>
    </div>
  );
};

const Landing = () => {
  const { gameState } = useGameContext();
  return (
    <div className={styles.container}>
      <h1>Welcome to Black Jack</h1>
      <div className={styles.options}>
        {gameState.started && <Join />}
        {!gameState.started && <Start />}
      </div>
    </div>
  );
};

export default Landing;
