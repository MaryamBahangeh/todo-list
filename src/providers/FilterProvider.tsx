import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { List } from "../models/list.ts";
import { TaskContext } from "./TaskProvider.tsx";

type Props = PropsWithChildren;

type ContextType = {
  filteredTasks: List[];
  setFilters: Dispatch<SetStateAction<Filters>>;
};

type Filters = {
  name: string;
  noteType: string;
};

export const FilterContext = createContext<ContextType>({
  filteredTasks: [],
  setFilters: () => {},
});

function FilterProvider({ children }: Props) {
  const [filteredTasks, setFilteredTasks] = useState<List[]>([]);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    noteType: "All",
  });

  const { tasks } = useContext(TaskContext);

  const filterTask = () => {
    const text = filters.name.toLowerCase();
    const dropdownSearchValue = filters.noteType;

    const filteredByText = [...tasks].filter((list: List) =>
      list.name.toLowerCase().includes(text),
    );

    const filteredByDropdownSearch = filteredByText.filter((x: List) => {
      if (dropdownSearchValue === "all") return true;
      if (dropdownSearchValue === "incomplete") return !x.isChecked;
      if (dropdownSearchValue === "complete") return x.isChecked;
    });
    setFilteredTasks([...filteredByDropdownSearch]);
  };

  useEffect(() => {
    filterTask();
  }, [filters, tasks]);

  return (
    <FilterContext.Provider value={{ filteredTasks, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
