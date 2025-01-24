import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import Player from "./components/Player";
import Loader from "../../components/Loader";
import Hand from "./components/Hand";

const Table = () => {
  const { gameState } = useBaseContext();
  const { players, dealer } = gameState;
  return (
    <div className={styles.table}>
      {gameState ? (
        <>
          <div className={styles.dealer}>
            <div>Dealer: </div>
            <div className={styles.hand}>
              <Hand
                active
                cards={dealer.cards}
                hideOverflow={false}
                hideFirst
              />
            </div>
            <div className={styles["game-info"]}>
              <div className={styles.ribbon}>2 to 1 INSURANCE 2 to 1</div>
              <h1>BLACK JACK</h1>
              <div className={styles.ribbon}>Dealer must stand on all 17</div>
            </div>
          </div>
          <div className={styles.players}>
            {players.map((player) => (
              <div className={styles.player}>
                <Player {...player} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Table;
