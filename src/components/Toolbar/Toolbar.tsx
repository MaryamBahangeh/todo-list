import { ChangeEvent, useContext } from "react";

import { Moon, SearchNormal, Sun } from "iconsax-react";

import i18next from "i18next";

import { ThemeContext } from "@/providers/ThemeProvider.tsx";
import { FilterContext } from "@/providers/FilterProvider.tsx";

import IconButton from "@/components/IconButton/IconButton.tsx";
import Input from "@/components/Input/Input.tsx";
import Select from "@/components/Select/Select.tsx";

import { LANGUAGE_KEY } from "@/constants/local-storage.constants.ts";

import {
  NOTE_TYPE_DROPDOWN_OPTIONS,
  LANGUAGE_DROPDOWN_OPTIONS,
} from "@/dropdown-options/item.dropdown-options.ts";

import { DropdownOption } from "@/models/dropdown-option.ts";

import styles from "./Toolbar.module.css";

function Toolbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { filters, setFilters } = useContext(FilterContext);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((old) => ({ ...old, name: e.target.value }));
  };

  const noteTypeChangeHandler = (option: DropdownOption): void => {
    setFilters((old) => ({ ...old, noteType: option }));
  };

  const languageChangeHandler = async (
    option: DropdownOption,
  ): Promise<void> => {
    try {
      await i18next.changeLanguage(option.value);

      localStorage.setItem(LANGUAGE_KEY, option.value);

      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    } catch (err) {
      console.log("Something went wrong loading", err);
    }
  };

  return (
    <div className={styles["toolbar"]}>
      <Input
        suffixIcon={<SearchNormal />}
        value={filters.name}
        onChange={nameChangeHandler}
      ></Input>

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
          defaultValue={i18next.language}
          onChange={languageChangeHandler}
          options={LANGUAGE_DROPDOWN_OPTIONS}
        ></Select>
      </div>
    </div>
  );
}

export default Toolbar;
