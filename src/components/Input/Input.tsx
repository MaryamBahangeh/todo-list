import { useState } from "react";

import styles from "./Input.module.css";

type Props = {
  onSearch: () => void;
};

function Input({ onSearch }: Props) {
  const [value, setValue] = useState("");

  return (
    <input
      className={styles.input}
      placeholder="Search note..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          onSearch();
        }
      }}
    />
  );
}

export default Input;
