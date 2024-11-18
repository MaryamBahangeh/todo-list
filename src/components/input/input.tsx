import styles from "./Input.module.css";
import { ChangeEvent } from "react";

type Props = {
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ value = "", defaultValue = "", onChange = () => {} }: Props) {
  return (
    <input
      className={styles.input}
      defaultValue={defaultValue}
      name="search"
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
}

export default Input;
