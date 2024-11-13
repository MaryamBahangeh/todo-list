import styles from "./Input.module.css";

type Props = {
  defaultValue: string;
};

function Input({ defaultValue }: Props) {
  return (
    <input
      className={styles.input}
      name="search"
      placeholder="Search note..."
      defaultValue={defaultValue}
    />
  );
}

export default Input;
