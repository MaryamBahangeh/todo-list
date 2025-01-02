import { ChangeEvent, ComponentProps } from "react";
import styles from "./Input.module.css";

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
      onChange={onChange}
      {...rest}
    />
  );
}

export default Input;
