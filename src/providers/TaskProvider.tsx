import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { List } from "../models/list.ts";
import { v4 as uuidv4 } from "uuid";

type Props = PropsWithChildren;
type ContextType = {
  tasks: List[];
  createTask: (name: string) => void;
  toggleIsDone: (ID: string, isChecked: boolean) => void;
  updateNote: (ID: string, name: string) => void;
  deleteNote: (ID: string) => void;
  makeEditable: (ID: string, editMode: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  createTask: () => {},
  toggleIsDone: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  makeEditable: () => {},
});

function TaskProvider({ children }: Props) {
  const LOCAL_STORAGE_KEY = "tasks";
  const [tasks, setTasks] = useState<List[]>(
    localStorage.getItem(LOCAL_STORAGE_KEY) == null
      ? []
      : JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string),
  );

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

  const createTask = (name: string) => {
    setTasks([
      ...tasks,
      { id: uuidv4(), name: name, isChecked: false, editMode: false },
    ]);
  };

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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        toggleIsDone,
        deleteNote,
        updateNote,
        makeEditable,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
