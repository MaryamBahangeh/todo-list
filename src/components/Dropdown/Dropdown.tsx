import { useState } from "react";
import { DropdownOption } from "@/models/dropdown-option.ts";
import styles from "./Dropdown.module.css";

export type Option = {
  name: string;
  value: string;
};

type Props = {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onChange: (option: DropdownOption) => void;
};

function Dropdown({ options, selectedOption, onChange }: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const selectOption = (option: DropdownOption) => {
    setOpenDropdown(false);
    onChange(option);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.selected}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <li className="subtitle1" value={selectedOption.value}>
          {selectedOption.translationKey}
        </li>
        <button>
          <img src="/images/chevron-down.svg" alt="" />
        </button>
      </div>

      <div
        className={styles.options}
        style={{ display: openDropdown ? "" : "none" }}
      >
        <ul>
          {options.map((option: DropdownOption) => (
            <li
              className="subtitle2"
              value={option.value}
              onClick={() => selectOption(option)}
            >
              {option.translationKey}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
