import styles from "./NoReasult.module.css";

function NoResult({ noResults }: { noResults: boolean }) {
  return (
    <div
      className={styles["no-results"]}
      style={{ display: noResults ? "" : "none" }}
    >
      <img alt="" src="./images/noResult.svg" />
      <span>Empty...</span>
    </div>
  );
}

export default NoResult;
