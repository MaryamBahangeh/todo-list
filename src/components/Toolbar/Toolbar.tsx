import styles from "./Toolbar.module.css";
import Input from "../Input/Input.tsx";
import { Moon, Sun, SearchNormal } from "iconsax-react";
import { ChangeEvent, useContext } from "react";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";
import { FilterContext } from "../../providers/FilterProvider.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import { ThemeContext } from "../../providers/ThemeProvider.tsx";

function Toolbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { filters, setFilters } = useContext(FilterContext);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((old) => ({ ...old, name: e.currentTarget.value }));
  };

  const noteTypeChangeHandler = (option: DropdownOption): void => {
    setFilters((old) => ({ ...old, noteType: option }));
  };

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search"]}>
        <Input value={filters.name} onChange={nameChangeHandler}></Input>
        <SearchNormal />
      </div>
      <Dropdown
        options={DROPDOWN_OPTIONS}
        defaultOption={DROPDOWN_OPTIONS[0]}
        selectedOption={filters.noteType}
        onChange={noteTypeChangeHandler}
      />
      <IconButton
        icon={isDarkMode ? <Sun /> : <Moon />}
        onClick={() => toggleDarkMode(!isDarkMode)}
      />
    </div>
  );
}

export default Toolbar;
