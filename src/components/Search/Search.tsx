import styles from "./Seacrh.module.css";
import Input from "../Input/Input.tsx";
import { SearchNormal } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";
import { TaskContext } from "../../providers/TaskProvider.tsx";

function Search() {
  const { search, tasks } = useContext(TaskContext);
  const [dropdownSearch, setDropdownSearch] = useState(DROPDOWN_OPTIONS[0]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    search(searchText, dropdownSearch.value);
  }, [searchText, dropdownSearch, tasks]);

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search"]}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        ></Input>
        <SearchNormal />
      </div>
      <Dropdown
        options={DROPDOWN_OPTIONS}
        defaultOption={DROPDOWN_OPTIONS[0]}
        selectedOption={dropdownSearch}
        onChange={(option: DropdownOption) => setDropdownSearch(option)}
      />
    </div>
  );
}

export default Search;
