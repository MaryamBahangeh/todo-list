import styles from "./NoReasult.module.css";
import { useContext } from "react";
import { FilterContext } from "../../providers/FilterProvider.tsx";

function NoResult() {
  const { filteredTasks } = useContext(FilterContext);

  return (
    <div
      className={styles["no-results"]}
      style={{ display: filteredTasks.length === 0 ? "" : "none" }}
    >
      <img alt="" src="./images/noResult.svg" />
      <span>Empty...</span>
    </div>
  );
}

export default NoResult;
