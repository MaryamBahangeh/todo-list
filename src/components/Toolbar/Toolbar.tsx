import { ChangeEvent, useContext } from "react";

import { SearchNormal } from "iconsax-react";
import { FilterContext } from "@/providers/FilterProvider.tsx";
import Input from "@/components/Input/Input.tsx";
import Select from "@/components/Select/Select.tsx";

import { NOTE_TYPE_DROPDOWN_OPTIONS } from "@/dropdown-options/item.dropdown-options.ts";

import { DropdownOption } from "@/models/dropdown-option.ts";

import styles from "./Toolbar.module.css";

function Toolbar() {
  const { filters, setFilters } = useContext(FilterContext);

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters((old) => ({ ...old, name: e.target.value }));
  };

  const noteTypeChangeHandler = (option: DropdownOption): void => {
    setFilters((old) => ({ ...old, noteType: option }));
  };

  return (
    <div className={styles["toolbar"]}>
      <Input
        suffixIcon={<SearchNormal />}
        value={filters.name}
        placeholder="Filter tasks by title..."
        onChange={nameChangeHandler}
      ></Input>

      <div className={styles.buttons}>
        <Select
          options={NOTE_TYPE_DROPDOWN_OPTIONS}
          defaultValue={NOTE_TYPE_DROPDOWN_OPTIONS[0].value}
          onChange={noteTypeChangeHandler}
          className={styles.options}
        />
      </div>
    </div>
  );
}

export default Toolbar;
