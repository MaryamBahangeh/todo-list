import styles from "./NoReasult.module.css";

function NoResult() {
  return (
    <div className={styles["no-results"]}>
      <img alt="" src="/images/noResult.svg" />
      <span>Empty...</span>
    </div>
  );
}

export default NoResult;
