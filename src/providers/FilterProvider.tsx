import { Task } from "../models/task.ts";
import { TaskContext } from "./TaskProvider.tsx";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { DropdownOption } from "../models/dropdown-option.ts";
import { NOTE_TYPE_DROPDOWN_OPTIONS } from "../dropdown-options/item.dropdown-options.ts";

type ContextType = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  filteredTasks: Task[];
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
  filteredTasks: [],
});

type Props = PropsWithChildren;

function FilterProvider({ children }: Props) {
  const { tasks } = useContext(TaskContext);

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const filteredTasks = useMemo(() => {
    const filteredByText = tasks.filter((list: Task) =>
      list.name.toLowerCase().includes(filters.name.toLowerCase()),
    );

    return filteredByText.filter((x: Task) => {
      if (filters.noteType.value === "all") return true;
      if (filters.noteType.value === "incomplete") return !x.isChecked;
      if (filters.noteType.value === "complete") return x.isChecked;
    });
  }, [filters, tasks]);

  return (
    <FilterContext.Provider value={{ filters, setFilters, filteredTasks }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
