import styles from "./Dropdown.module.css";
import { DropdownOption } from "../../models/dropdown-option.ts";
import { useState } from "react";

type Props = {
  options: DropdownOption[];
  defaultOption?: DropdownOption;
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
        <li className="typography-small-title" value={selectedOption.value}>
          {selectedOption.name}
        </li>
        <button>
          <img src="./images/chevron-down.svg" alt="" />
        </button>
      </div>

      <div
        className={styles.options}
        style={{ display: openDropdown ? "" : "none" }}
      >
        <ul>
          {options.map((option: DropdownOption) => (
            <li
              className="typography-small-label"
              value={option.value}
              onClick={() => selectOption(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
