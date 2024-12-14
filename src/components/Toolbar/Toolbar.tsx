import { ChangeEvent, useContext } from "react";
import { Helmet } from "react-helmet";
import { Drop, Moon, SearchNormal, Sun } from "iconsax-react";

import { ThemeContext } from "../../providers/ThemeProvider.tsx";
import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import { FilterContext } from "../../providers/FilterProvider.tsx";

import { NOTE_TYPE_DROPDOWN_OPTIONS } from "@/dropdown-options/item.dropdown-options.ts";
import { DropdownOption } from "@/models/dropdown-option.ts";

import Dropdown, { Option } from "../Dropdown/Dropdown.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import Input from "../Input/Input.tsx";

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

  const changeLanguageHandler = (option: Option) => {
    setLanguage(option.value);
  };

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search"]}>
        <Input value={filters.name} onChange={nameChangeHandler}></Input>
        <SearchNormal />
      </div>
      <Dropdown
        options={NOTE_TYPE_DROPDOWN_OPTIONS}
        selectedOption={filters.noteType}
        onChange={noteTypeChangeHandler}
      />
      <IconButton
        icon={!isDarkMode ? <Moon /> : <Sun />}
        onClick={toggleDarkMode}
      />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">en</option>
        <option value="fa">fa</option>
      </select>
      <Helmet
        htmlAttributes={{
          lang: language,
          dir: language === "fa" ? "rtl" : undefined,
        }}
      />
    </div>
  );
}

export default Toolbar;
