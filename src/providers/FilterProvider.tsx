import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { DropdownOption } from "../models/dropdown-option.ts";
import { NOTE_TYPE_DROPDOWN_OPTIONS } from "../dropdown-options/item.dropdown-options.ts";

type ContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

type Filters = {
  name: string;
  noteType: DropdownOption;
};

const DEFAULT_FILTERS: Filters = {
  name: "",
  noteType: NOTE_TYPE_DROPDOWN_OPTIONS[0],
};

export const FilterContext = createContext<ContextType>({
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
});

type Props = PropsWithChildren;

function FilterProvider({ children }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
