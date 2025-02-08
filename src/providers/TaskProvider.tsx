import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";

import { Task } from "../models/task.ts";
import {
  addTaskApi,
  deleteTaskApi,
  fetchTasks,
  updateTaskApi,
} from "@/api/task.ts";
import { FilterContext } from "@/providers/FilterProvider.tsx";

type ContextType = {
  tasks: Task[];
  isLoading: boolean;
  createTask: (name: string) => void;
  toggleIsChecked: (ID: string, isChecked: boolean) => void;
  updateTaskName: (ID: string, name: string) => void;
  deleteTask: (ID: string) => void;
  toggleIsEditing: (ID: string, isEditing: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  isLoading: false,
  createTask: () => {},
  toggleIsChecked: () => {},
  deleteTask: () => {},
  updateTaskName: () => {},
  toggleIsEditing: () => {},
});

type Props = PropsWithChildren;

function TaskProvider({ children }: Props) {
  const { filters } = useContext(FilterContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    fetchTasks().then((x) => {
      setTasks(x);
      setIsLoading(false);
    });
  }, []);

  const createTask = (name: string) => {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      isChecked: false,
      isEditing: false,
    };

    setTasks((old) => [...old, newTask]);
    addTaskApi(newTask).then();
  };

  function toggleIsChecked(id: string, isChecked: boolean) {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          updateTaskApi({ ...task, isChecked }).then();
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
          updateTaskApi({ ...task, name }).then();
          return { ...task, name };
        }

        return task;
      }),
    );

    toggleIsEditing(id, false);
  }

  function deleteTask(id: string) {
    setTasks((old) => old.filter((task) => task.id !== id));
    deleteTaskApi(id).then();
  }

  function toggleIsEditing(id: string, isEditing: boolean) {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          updateTaskApi({ ...task, isEditing }).then();
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
        isLoading,
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
