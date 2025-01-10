import { ChangeEvent, useContext } from "react";
import { Moon, SearchNormal, Sun } from "iconsax-react";

import { ThemeContext } from "@/providers/ThemeProvider.tsx";
import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import { FilterContext } from "@/providers/FilterProvider.tsx";
import IconButton from "@/components/IconButton/IconButton.tsx";
import Input from "@/components/Input/Input.tsx";
import Select from "@/components/Select/Select.tsx";

import {
  NOTE_TYPE_DROPDOWN_OPTIONS,
  LANGUAGE_DROPDOWN_OPTIONS,
} from "@/dropdown-options/item.dropdown-options.ts";

import { DropdownOption } from "@/models/dropdown-option.ts";

import styles from "./Toolbar.module.css";

function Toolbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(DictionaryContext);
  const { filters, setFilters } = useContext(FilterContext);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((old) => ({ ...old, name: e.target.value }));
  };

  const noteTypeChangeHandler = (option: DropdownOption): void => {
    setFilters((old) => ({ ...old, noteType: option }));
  };

  const languageChangeHandler = (option: DropdownOption): void => {
    setLanguage(option.value);
  };

  return (
    <div className={styles["toolbar"]}>
      <div className={styles["search"]}>
        <Input value={filters.name} onChange={nameChangeHandler}></Input>
        <SearchNormal />
      </div>

      <div className={styles.buttons}>
        <Select
          options={NOTE_TYPE_DROPDOWN_OPTIONS}
          defaultValue={NOTE_TYPE_DROPDOWN_OPTIONS[0].value}
          onChange={noteTypeChangeHandler}
          className={styles.options}
        ></Select>

        <IconButton
          icon={!isDarkMode ? <Moon /> : <Sun />}
          onClick={toggleDarkMode}
        />

        <Select
          defaultValue={language}
          onChange={languageChangeHandler}
          options={LANGUAGE_DROPDOWN_OPTIONS}
        ></Select>
      </div>
    </div>
  );
}

export default Toolbar;
