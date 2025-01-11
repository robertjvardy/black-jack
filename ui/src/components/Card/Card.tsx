import { CardOrderType, CardSuitType } from "../../shared/types";
import styles from "./styles.module.scss";
import HiddenCard from "./CardImages/b.svg";
import { fetchCardSvg } from "./CardImages/utils";

const Card = ({
  order,
  suit,
  hidden = false,
  index = 0,
}: {
  order: CardOrderType;
  suit: CardSuitType;
  hidden?: boolean;
  index?: number;
}) => {
  const leftOffset = `${5 + index * 30}px`;
  return (
    <div className={styles.card} style={{ left: leftOffset }}>
      <img
        src={hidden ? HiddenCard : fetchCardSvg(order, suit)}
        alt={hidden ? "Hidden Card" : `${order}${suit}`}
      />
    </div>
  );
};

export default Card;
