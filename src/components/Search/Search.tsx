import styles from "./Seacrh.module.css";
import Input from "../Input/Input.tsx";
import { SearchNormal } from "iconsax-react";
import { FormEvent } from "react";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";
type Props = {
  dropdownSearch: DropdownOption;
  dropdownOnChange: (option: DropdownOption) => void;
  searchFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  serachTextOnchange: (value: string) => void;
  searchText: string;
};

function Search({
  searchFormSubmit,
  dropdownSearch,
  dropdownOnChange,
  serachTextOnchange,
  searchText,
}: Props) {
  return (
    <div className={styles["search-container"]}>
      <form className={styles.search} onSubmit={searchFormSubmit}>
        <Input
          value={searchText}
          onChange={(e) => serachTextOnchange(e.currentTarget.value)}
        ></Input>
        <SearchNormal />
      </form>
      <div className={styles.dropdown}>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          defaultOption={DROPDOWN_OPTIONS[0]}
          selectedOption={dropdownSearch}
          onChange={(option: DropdownOption) => dropdownOnChange(option)}
        />
      </div>
    </div>
  );
}

export default Search;
