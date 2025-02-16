import { CardOrderType, CardSuitType } from "shared-resources";
import styles from "./styles.module.scss";
import HiddenCard from "./CardImages/b.svg";
import { fetchCardSvg } from "./CardImages/utils";
import { motion } from "framer-motion";

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
      <motion.img
        src={hidden ? HiddenCard : fetchCardSvg(order, suit)}
        alt={hidden ? "Hidden Card" : `${order}${suit}`}
        initial={{
          x: "100vw", // Start from the right outside the viewport
          y: "-100vh", // Start from the top outside the viewport
        }}
        animate={{
          x: 0, // Move to the rendered component's position
          y: 0,
        }}
        transition={{
          type: "spring", // Smooth spring-like motion
          stiffness: 100, // Adjust stiffness for bounce effect
          damping: 20, // Adjust damping to control the smoothness
        }}
      />
    </div>
  );
};

export default Card;
