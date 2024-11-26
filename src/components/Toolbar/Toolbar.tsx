import styles from "./Toolbar.module.css";
import Input from "../Input/Input.tsx";
import { Moon, SearchNormal } from "iconsax-react";
import { useContext, useEffect, useState } from "react";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Dropdown from "../Dropdown/Dropdown.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";
import { FilterContext } from "../../providers/FilterProvider.tsx";
import IconButton from "../IconButton/IconButton.tsx";

function Toolbar() {
  const [dropdownSearch, setDropdownSearch] = useState(DROPDOWN_OPTIONS[0]);
  const [searchText, setSearchText] = useState("");
  const { setFilters } = useContext(FilterContext);

  useEffect(() => {
    setFilters({ name: searchText, noteType: dropdownSearch.value });
  }, [searchText, dropdownSearch]);

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
      <IconButton icon={<Moon />} />
    </div>
  );
}

export default Toolbar;
