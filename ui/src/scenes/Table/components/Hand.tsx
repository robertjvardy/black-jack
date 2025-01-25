import Card from "../../../components/Card";
import { CardType } from "../../../shared/types";
import styles from "./hand.module.scss";

const Hand = ({
  active,
  cards,
  hideFirst = false,
  hideOverflow = true,
}: {
  active: boolean;
  cards: CardType[];
  hideFirst?: boolean;
  hideOverflow?: boolean;
}) => {
  return active ? (
    <div className={styles["hand-container"]}>
      <div
        className={styles["card-container"]}
        style={{ overflow: hideOverflow ? "hidden" : "" }}
      >
        {cards.map(({ order, suit }, index) => (
          <Card
            key={index}
            order={order}
            suit={suit}
            index={index}
            hidden={hideFirst && index === 0}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default Hand;
