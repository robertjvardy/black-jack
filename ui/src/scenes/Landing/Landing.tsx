import { useNavigate } from "react-router";
import styles from "./styles.module.scss";
import { useStartGameMutation } from "../../queries";

const Join = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Theres a game in progress!</h2>
      <div className={styles["btn-container"]}>
        <button onClick={() => navigate("/play")}>Join Table</button>
        <button onClick={() => navigate("/table")}>View the Table</button>
      </div>
    </div>
  );
};

const Start = () => {
  const { mutate } = useStartGameMutation();
  return (
    <div>
      <h2>You're the first one here!</h2>

      <button onClick={() => mutate()}>Start a Game</button>
    </div>
  );
};

const Landing = ({ isStarted }: { isStarted: boolean }) => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Black Jack</h1>
      <div className={styles.options}>
        {isStarted && <Join />}
        {!isStarted && <Start />}
      </div>
    </div>
  );
};

export default Landing;
