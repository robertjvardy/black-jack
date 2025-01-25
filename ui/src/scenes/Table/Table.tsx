import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import Player from "./components/Player";
import Loader from "../../components/Loader";
import Hand from "./components/Hand";
import { dealerCardsDealtIndex } from "../../shared/constants";

const Table = () => {
  const { gameState, cardsDealt } = useBaseContext();
  // const { updateDealingTo, updateCardsDealt } = actions;
  const { players, dealer } = gameState;
  // const participatingPlayers = players.filter((player) =>
  //   currentRound.players.includes(player.index)
  // );

  // TODO move this to the method that gets called on "initial-deal"
  // useEffect(() => {
  // if (dealingTo === InitialDeal) {
  //   // Deal first card to players
  //   participatingPlayers.forEach((player, index) => {
  //     setTimeout(() => {
  //       updateCardsDealt(player.index, 1);
  //     }, index * 1000);
  //   });
  //   // Deal to the Dealer
  //   setTimeout(() => {
  //     updateCardsDealt(6, 1);
  //   }, (participatingPlayers.length + 1) * 1000);
  //   // Deal second card to players
  //   participatingPlayers.forEach((player, index) => {
  //     setTimeout(() => {
  //       updateCardsDealt(player.index, 2);
  //     }, (participatingPlayers.length + 1 + index) * 1000);
  //   });
  //   // Deal second card to the Dealer
  //   setTimeout(() => {
  //     updateCardsDealt(6, 2);
  //   }, (participatingPlayers.length * 2 + 2) * 1000);
  //   // End the initial deal state
  //   updateDealingTo(null);
  // }
  // }, [dealingTo, participatingPlayers, updateDealingTo, updateCardsDealt]);

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
                cardsDealt={cardsDealt[dealerCardsDealtIndex]}
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
              <div className={styles.player} key={player.index}>
                <Player {...player} cardsDealt={cardsDealt[player.index]} />
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
