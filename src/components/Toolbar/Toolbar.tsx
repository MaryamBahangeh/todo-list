import styles from "./Toolbar.module.css";
import Input from "../Input/Input.tsx";
import { Moon, SearchNormal, Sun } from "iconsax-react";

import { ChangeEvent, useContext } from "react";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";
import { filterContext } from "../../providers/FilterProvider.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import { ThemeContext } from "../../providers/ThemeProvider.tsx";

function Toolbar() {
  const { setFilters, filters } = useContext(filterContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((old) => ({ ...old, name: e.target.value }));
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
        selectedOption={filters.noteType}
        onChange={noteTypeChangeHandler}
      />
      <IconButton
        icon={!isDarkMode ? <Moon /> : <Sun />}
        onClick={toggleDarkMode}
      />
    </div>
  );
}

export default Toolbar;
