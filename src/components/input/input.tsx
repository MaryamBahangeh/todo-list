import styles from "./input.module.css";
import { useState } from "react";

function Input() {
  const [value, setValue] = useState("");
  return (
    <input
      className={styles.main}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
}

export default Input;
