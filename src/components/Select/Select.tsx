import { ReactElement } from "react";

import { useTranslation } from "react-i18next";

import clsx from "clsx";

import { DropdownOption } from "@/models/dropdown-option.ts";

import styles from "./Select.module.css";

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
  const { t } = useTranslation();

  return (
    <select
      className={clsx(styles.select, className)}
      onChange={(e) =>
        onChange({
          translationKey: e.target.name,
          value: e.currentTarget.value,
        })
      }
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option
          className={styles.option}
          key={option.value}
          value={option.value}
        >
          {t(option.translationKey as never)}
        </option>
      ))}
    </select>
  );
}
