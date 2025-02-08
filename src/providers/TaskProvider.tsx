import {
  createContext,
  PropsWithChildren,
  useCallback,
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
  createTask: (name: string) => Promise<void>;
  toggleIsChecked: (ID: string, isChecked: boolean) => Promise<void>;
  updateTaskName: (ID: string, name: string) => Promise<void>;
  deleteTask: (ID: string) => Promise<void>;
  toggleIsEditing: (ID: string, isEditing: boolean) => Promise<void>;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  isLoading: false,
  createTask: async () => {},
  toggleIsChecked: async () => {},
  deleteTask: async () => {},
  updateTaskName: async () => {},
  toggleIsEditing: async () => {},
});

type Props = PropsWithChildren;

function TaskProvider({ children }: Props) {
  const { filters } = useContext(FilterContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isFetching, setIsFetching] = useState<boolean>(false);

  const refetchTasks = useCallback(async () => {
    setIsLoading(true);

    const fetchedTasks = await fetchTasks(filters);

    setTasks(fetchedTasks);
    setIsLoading(false);
  }, [filters]);

  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);

  const createTask = async (name: string): Promise<void> => {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      isChecked: false,
      isEditing: false,
    };

    addTaskApi(newTask).then(() => refetchTasks());
  };

  const toggleIsChecked = async (
    id: string,
    isChecked: boolean,
  ): Promise<void> => {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          updateTaskApi({ ...task, isChecked }).then();
          return { ...task, isChecked };
        }

        return task;
      }),
    );
  };

  const updateTaskName = async (id: string, name: string): Promise<void> => {
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
  };

  const deleteTask = async (id: string): Promise<void> => {
    setTasks((old) => old.filter((task) => task.id !== id));
    deleteTaskApi(id).then();
  };

  const toggleIsEditing = async (
    id: string,
    isEditing: boolean,
  ): Promise<void> => {
    setTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          updateTaskApi({ ...task, isEditing }).then();
          return { ...task, isEditing };
        }

        return task;
      }),
    );
  };

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
