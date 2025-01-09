import { CardType } from "../../../shared/types";
import styles from "./hand.module.scss";

const Hand = ({ active, cards }: { active: boolean; cards: CardType[] }) => {
  return active ? (
    <div className={styles["hand-container"]}>
      {cards.map(({ order, suit }) => (
        // TODO create a map from letters to suit symbols
        <div>{`${order}${suit}`}</div>
      ))}
    </div>
  ) : null;
};

export default Hand;
