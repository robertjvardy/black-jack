import styles from "./inProgressActions.module.scss";

const InActive = () => (
  <div className={styles["waiting-text"]}>
    Waiting for the next round to start.
    <div className={styles["sub-text"]}>
      Relax and watch your friends lose money
    </div>
  </div>
);

const InProgressActions = ({ active }: { active: boolean }) => {
  return (
    <div className={styles["actions-container"]}>
      {active ? <>Actions</> : <InActive />}
    </div>
  );
};

export default InProgressActions;
