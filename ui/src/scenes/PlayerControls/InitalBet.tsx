import styles from "./styles.module.scss";

const InitalBet = ({ currentBet }: { currentBet?: number }) => {
  return (
    <div className={styles["inital-bet"]}>
      <div className={styles.title}>{currentBet ?? "Place your bet:"}</div>
      <div className={styles["bet-options"]}>
        <button>5</button>
        <button>10</button>
        <button>25</button>
        <button>50</button>
        <button>100</button>
      </div>
    </div>
  );
};

export default InitalBet;
