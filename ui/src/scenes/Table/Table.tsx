import { useEffect } from "react";
import { useGameContext } from "../../context/SocketContext";
import invariant from "tiny-invariant";
import styles from "./styles.module.scss";
import Player from "./components/Player";
import Loader from "../../components/Loader";

const Table = () => {
  const { socket, gameState } = useGameContext();
  invariant(socket, "Socket is null");

  useEffect(() => {
    // TODO create action in context to hide this implementation
    socket.emit("init-table");
  }, [socket]);

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
            <div className={styles.player}>
              <Player {...gameState?.players[6]} />
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
