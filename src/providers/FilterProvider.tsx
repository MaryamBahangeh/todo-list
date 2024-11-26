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

const DEFAULT_FILTERS: Filters = {
  name: "",
  noteType: DROPDOWN_OPTIONS[0],
};

export const FilterContext = createContext<ContextType>({
  filteredTasks: [],
  filters: DEFAULT_FILTERS,
  setFilters: () => {},
});

function FilterProvider({ children }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const { tasks } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    const filteredByText = tasks.filter((list: List) =>
      list.name.toLowerCase().includes(filters.name.toLowerCase()),
    );

    return filteredByText.filter((x: List) => {
      if (filters.noteType.value === "all") return true;
      if (filters.noteType.value === "incomplete") return !x.isChecked;
      if (filters.noteType.value === "complete") return x.isChecked;
    });
  }, [filters, tasks]);

  return (
    <FilterContext.Provider value={{ filteredTasks, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
