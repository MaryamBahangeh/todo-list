import { useContext } from "react";
import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import styles from "./NoReasult.module.css";

function NoResult() {
  const { findWordInDictionary } = useContext(DictionaryContext);
  return (
    <div className={styles["no-results"]}>
      <img alt="" src="/images/no-result.svg" />
      <span></span>

      <span>{findWordInDictionary("empty")}...</span>
    </div>
  );
}

export default NoResult;
