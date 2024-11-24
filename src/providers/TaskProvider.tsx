import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { List } from "../models/list.ts";
import { v4 as uuidv4 } from "uuid";

type Props = PropsWithChildren;
type ContextType = {
  tasks: List[];
  searchedTasks: List[];
  createTask: (name: string) => void;
  toggleIsDone: (ID: string, isChecked: boolean) => void;
  updateNote: (ID: string, name: string) => void;
  deleteNote: (ID: string) => void;
  makeEditable: (ID: string, editMode: boolean) => void;
  search: (text: string, dropdownSearchValue: string) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  searchedTasks: [],
  createTask: () => {},
  toggleIsDone: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  makeEditable: () => {},
  search: () => {},
});

function TaskProvider({ children }: Props) {
  const LOCAL_STORAGE_KEY = "tasks";
  const [tasks, setTasks] = useState<List[]>(
    localStorage.getItem(LOCAL_STORAGE_KEY) == null
      ? []
      : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string),
  );

  const [searchedTasks, setSearchedTasks] = useState<List[]>([]);
  const createTask = (name: string) => {
    setTasks([
      ...tasks,
      { id: uuidv4(), name: name, isChecked: false, editMode: false },
    ]);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function updateNote(id: string, text: string) {
    setTasks(
      [...tasks].map((task) => {
        if (task.id === id) task["name"] = text;
        return task;
      }),
    );
    makeEditable(id, false);
  }

  function toggleIsDone(id: string, isChecked: boolean) {
    setTasks(
      [...tasks].map((task) => {
        if (task.id === id) return { ...task, isChecked };
        return task;
      }),
    );
  }

  function deleteNote(id: string) {
    const old = [...tasks];
    const index = old.findIndex((task) => task.id === id);
    old.splice(index, 1);

    setTasks([...old]);
  }

  function makeEditable(ID: string, editMode: boolean) {
    setTasks(
      [...tasks].map((task) => {
        if (task.id === ID) task.editMode = editMode;
        return task;
      }),
    );
  }

  const search = (text: string, dropdownSearchValue: string) => {
    const filteredByText = [...tasks].filter((list: List) =>
      list.name.toLowerCase().includes(text.toLowerCase()),
    );

    const filteredByDropdownSearch = filteredByText.filter((x: List) => {
      if (dropdownSearchValue === "all") return true;
      if (dropdownSearchValue === "incomplete") return !x.isChecked;
      if (dropdownSearchValue === "complete") return x.isChecked;
    });
    setSearchedTasks([...filteredByDropdownSearch]);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchedTasks,
        createTask,
        toggleIsDone,
        deleteNote,
        updateNote,
        makeEditable,
        search,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
