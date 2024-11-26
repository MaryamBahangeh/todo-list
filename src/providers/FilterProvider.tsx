import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { List } from "../models/list.ts";
import { TaskContext } from "./TaskProvider.tsx";
import { DropdownOption } from "../models/dropdown-option.ts";
import { DROPDOWN_OPTIONS } from "../models/Item-state-dropdown-options.ts";

type Props = PropsWithChildren;

type ContextType = {
  filteredTasks: List[];
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

type Filters = {
  name: string;
  noteType: DropdownOption;
};

export const FilterContext = createContext<ContextType>({
  filteredTasks: [],
  filters: {
    name: "",
    noteType: DROPDOWN_OPTIONS[0],
  },
  setFilters: () => {},
});

function FilterProvider({ children }: Props) {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    noteType: DROPDOWN_OPTIONS[0],
  });

  const { tasks } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    const text = filters.name.toLowerCase();
    const dropdownSearchValue = filters.noteType;

    const filteredByText = [...tasks].filter((list: List) =>
      list.name.toLowerCase().includes(text),
    );

    return filteredByText.filter((x: List) => {
      if (dropdownSearchValue.value === "all") return true;
      if (dropdownSearchValue.value === "incomplete") return !x.isChecked;
      if (dropdownSearchValue.value === "complete") return x.isChecked;
    });
  }, [filters, tasks]);

  return (
    <FilterContext.Provider value={{ filteredTasks, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
