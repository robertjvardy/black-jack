import classNames from "classnames";
import styles from "./player.module.scss";

const Player = ({ index, present }: { index: number; present: boolean }) => {
  console.log(index, present);
  return (
    <div
      className={classNames(styles.container, {
        [styles["player-present"]]: present,
      })}
    >
      {index + 1}
    </div>
  );
};

export default Player;
