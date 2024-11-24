import styles from "./NoReasult.module.css";
import { useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider.tsx";

function NoResult() {
  const { searchedTasks } = useContext(TaskContext);
  return (
    <div
      className={styles["no-results"]}
      style={{ display: searchedTasks.length === 0 ? "" : "none" }}
    >
      <img alt="" src="./images/noResult.svg" />
      <span>Empty...</span>
    </div>
  );
}

export default NoResult;
