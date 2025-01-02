import { ReactElement } from "react";
import { DropdownOption } from "@/models/dropdown-option.ts";
import styles from "./Select.module.css";

type Props = {
  options: DropdownOption[];
  defaultValue: string;
  onChange: (option: DropdownOption) => void;
};

export default function Select({
  options,
  defaultValue,
  onChange,
}: Props): ReactElement {
  return (
    <select
      className={styles.select}
      onChange={(e) =>
        onChange({ name: e.target.name, value: e.currentTarget.value })
      }
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option
          className={styles.option}
          key={option.value}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}
