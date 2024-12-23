import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import Player from "./components/Player";
import Loader from "../../components/Loader";

const Table = () => {
  const { gameState } = useBaseContext();

  return (
    <div className={styles.table}>
      {gameState ? (
        <>
          <div className={styles.dealer}>
            <div className={styles.hand}>dealers hand</div>
            <div className={styles["game-info"]}>
              <h1>BLACK JACK</h1>
              <h5>Dealer must stand on all 17</h5>
              <div className={styles.ribbon}>2 to 1 INSURANCE 2 to 1</div>
            </div>
          </div>
          <div className={styles.players}>
            <div className={styles.player}>
              <Player {...gameState?.players[0]} />
            </div>
            <div className={styles.player}>
              <Player {...gameState?.players[1]} />
            </div>
            <div className={styles.player}>
              <Player {...gameState?.players[2]} />
            </div>
            <div className={styles.player}>
              <Player {...gameState?.players[3]} />
            </div>
            <div className={styles.player}>
              <Player {...gameState?.players[4]} />
            </div>
            <div className={styles.player}>
              <Player {...gameState?.players[5]} />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Table;
