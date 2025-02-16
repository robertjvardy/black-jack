/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./actions.module.scss";
import InsuranceActions from "./InsuranceAction";
import { fetchSeatIndex } from "../../../context/localStorageUtils";
import { useBaseContext } from "../../../context/BaseContext";
import { ROUND_STATUS_MAP, RoundStatusValuesType } from "shared-resources";

const InActive = () => (
  <div className={styles["waiting-text"]}>
    Waiting for the next round to start.
    <div className={styles["sub-text"]}>
      Relax and watch your friends lose money
    </div>
  </div>
);

const fetchActionComponent = (status: RoundStatusValuesType) => {
  switch (status) {
    case ROUND_STATUS_MAP.insuranceCheck:
      return (props?: any) => <InsuranceActions {...props} />;
    default:
      return () => null;
  }
};

const Actions = ({
  active,
  roundStatus,
}: {
  active: boolean;
  roundStatus: RoundStatusValuesType;
}) => {
  const seatIndex = fetchSeatIndex();
  const { gameState } = useBaseContext();

  const actionComponent = fetchActionComponent(roundStatus);
  return (
    <div className={styles["actions-container"]}>
      {active ? actionComponent({ gameState, seatIndex }) : <InActive />}
    </div>
  );
};

export default Actions;
