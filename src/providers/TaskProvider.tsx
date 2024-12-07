import { createContext, PropsWithChildren, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { TASKS_KEY } from "../constants/local-storage.constants.ts";
import { Task } from "../models/task.ts";

type ContextType = {
  tasks: Task[];
  createTask: (name: string) => void;
  toggleIsChecked: (ID: string, isChecked: boolean) => void;
  updateTaskName: (ID: string, name: string) => void;
  deleteTask: (ID: string) => void;
  toggleIsEditing: (ID: string, isEditing: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  createTask: () => {},
  toggleIsChecked: () => {},
  deleteTask: () => {},
  updateTaskName: () => {},
  toggleIsEditing: () => {},
});

const defaultTasks = (): Task[] => {
  if (localStorage.getItem(TASKS_KEY)) {
    return JSON.parse(localStorage.getItem(TASKS_KEY) as string);
  }

  return [];
};

type Props = PropsWithChildren;

function TaskProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (name: string) => {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      isChecked: false,
      isEditing: false,
    };

    setTasks((old) => [...old, newTask]);
  };

  function toggleIsChecked(id: string, isChecked: boolean) {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          return { ...task, isChecked };
        }

        return task;
      }),
    );
  }

  function updateTaskName(id: string, name: string) {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          return { ...task, name };
        }

        return task;
      }),
    );

    toggleIsEditing(id, false);
  }

  function deleteTask(id: string) {
    setTasks((old) => old.filter((task) => task.id !== id));
  }

  function toggleIsEditing(id: string, isEditing: boolean) {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          return { ...task, isEditing };
        }

        return task;
      }),
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        toggleIsChecked,
        updateTaskName,
        deleteTask,
        toggleIsEditing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
