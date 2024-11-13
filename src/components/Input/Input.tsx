import styles from "./Input.module.css";

type Props = {
  defaultValue: string;
  onSearch: (value: string) => void;
};

function Input({ defaultValue, onSearch }: Props) {
  return (
    <input
      className={styles.input}
      placeholder="Search note..."
      defaultValue={defaultValue}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          onSearch(e.currentTarget.value);
        }
      }}
    />
  );
}

export default Input;
