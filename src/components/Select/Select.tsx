import { ReactElement } from "react";
import { DropdownOption } from "@/models/dropdown-option.ts";
import styles from "./Select.module.css";
import clsx from "clsx";

type Props = {
  options: DropdownOption[];
  defaultValue: string;
  onChange: (option: DropdownOption) => void;
  className?: string;
};

export default function Select({
  options,
  defaultValue,
  onChange,
  className,
}: Props): ReactElement {
  return (
    <select
      className={clsx(styles.select, className)}
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
