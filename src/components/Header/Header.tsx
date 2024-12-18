import { useContext } from "react";
import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import styles from "./Header.module.css";

function Header() {
  const { findWordInDictionary } = useContext(DictionaryContext);

  return (
    <header className={styles.header}>
      <h1 className="h1">{findWordInDictionary("ToDoList")}</h1>
    </header>
  );
}

export default Header;
