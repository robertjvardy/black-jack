import { useBaseContext } from "../../context/BaseContext";
import styles from "./styles.module.scss";
import Player from "./components/Player";
import Loader from "../../components/Loader";
import Hand from "./components/Hand";
import { useEffect, useState } from "react";
import {
  CardType,
  DealingToType,
  HandType,
  PlayerIndexType,
} from "../../shared/types";
import { InitialDeal } from "../../shared/constants";

type HandsStateType = { cards: CardType[] }[];
const dealerIndex = 6;
type HandStateIndexType = PlayerIndexType | 6;

const dealInitialCards = (
  newState: HandType[],
  updateDealingToState: (dealingTo: DealingToType) => void,
  updateHands: (handIndex: HandStateIndexType, hand: HandType) => void
) => {
  console.log("New: ", newState);
  // for each player deal first card
  newState.forEach((hand, index) => {
    if (hand.cards.length) {
      setTimeout(() => {
        updateHands(index as PlayerIndexType, { cards: [hand.cards[0]] });
      }, 1000);
    }
  });
  // deal first card for the dealer face down
  setTimeout(() => {
    updateHands(dealerIndex as PlayerIndexType, {
      cards: [newState[dealerIndex].cards[0]],
    });
  }, 1000);
  // deal each players second card
  newState.forEach((hand, index) => {
    if (hand.cards.length) {
      setTimeout(() => {
        updateHands(index as PlayerIndexType, { cards: hand.cards });
      }, 1000);
    }
  });
  // deal to the dealer
  setTimeout(() => {
    updateHands(dealerIndex as PlayerIndexType, {
      cards: newState[dealerIndex].cards,
    });
  }, 1000);
  // set dealingTo to null
  updateDealingToState(null);
};

const handsInitialState = [
  { cards: [] },
  { cards: [] },
  { cards: [] },
  { cards: [] },
  { cards: [] },
  { cards: [] },
  { cards: [] },
];

const Table = () => {
  const { gameState, actions, dealingTo } = useBaseContext();
  const { players, dealer } = gameState;
  const { updateDealingTo } = actions;
  const [hands, setHands] = useState<HandsStateType>(handsInitialState);

  useEffect(() => {
    const orderedHands = [...players.map((player) => player.hand), dealer];

    const handleUpdateDealingTo = (dealingTo: DealingToType) =>
      updateDealingTo(dealingTo);

    const handleUpdateHand = (
      handIndex: PlayerIndexType | typeof dealerIndex,
      hand: HandType
    ) => {
      const newHands = hands;
      newHands[handIndex].cards = hand.cards;
      setHands(newHands);
    };

    if (
      dealingTo === InitialDeal &&
      players.some((player) => player.hand.cards.length)
    ) {
      console.log("HAND", hands);
      console.log("orderedHands", orderedHands);
      dealInitialCards(orderedHands, handleUpdateDealingTo, handleUpdateHand);
    }
  }, [players, hands, updateDealingTo, dealingTo, dealer, setHands]);

  return (
    <div className={styles.table}>
      {gameState ? (
        <>
          <div className={styles.dealer}>
            <div>Dealer: </div>
            <div className={styles.hand}>
              <Hand
                active
                cards={hands[dealerIndex].cards}
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
                <Player {...player} hand={hands[player.index]} />
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
