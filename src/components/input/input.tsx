import styles from "./Input.module.css";
import { ChangeEvent, ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ value = "", onChange, ...rest }: Props) {
  return (
    <input
      className={styles.input}
      name="search"
      value={value}
      onChange={(e) => onChange(e)}
      {...rest}
    />
  );
}

export default Input;
