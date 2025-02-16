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
  patchTaskApi,
} from "@/api/task.ts";
import { FilterContext } from "@/providers/FilterProvider.tsx";

type ContextType = {
  tasks: Task[];
  editingTask: Task | null;
  createTask: (name: string) => Promise<void>;
  toggleIsChecked: (ID: string, isChecked: boolean) => Promise<void>;
  updateTaskName: (ID: string, name: string) => Promise<void>;
  deleteTask: (ID: string) => Promise<void>;
  toggleIsEditing: (ID: string, isEditing: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  editingTask: null,
  createTask: async () => {},
  toggleIsChecked: async () => {},
  deleteTask: async () => {},
  updateTaskName: async () => {},
  toggleIsEditing: () => {},
});

type Props = PropsWithChildren;

function TaskProvider({ children }: Props) {
  const { filters } = useContext(FilterContext);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const refetchTasks = useCallback(async () => {
    const fetchedTasks = await fetchTasks(filters);
    setTasks(fetchedTasks);
  }, [filters]);

  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);

  const toggleIsEditing = useCallback(
    (id: string, isEditing: boolean): void => {
      if (!isEditing) {
        setEditingTask(null);
        return;
      }

      const task = tasks.find((x) => x.id === id);
      setEditingTask(task ?? null);
    },
    [tasks],
  );

  const createTask = useCallback(
    async (name: string): Promise<void> => {
      const newTask: Task = {
        id: uuidv4(),
        name: name,
        isChecked: false,
      };

      await addTaskApi(newTask);
      await refetchTasks();
    },
    [refetchTasks],
  );

  const toggleIsChecked = useCallback(
    async (id: string, isChecked: boolean): Promise<void> => {
      await patchTaskApi(id, { isChecked });
      await refetchTasks();
    },
    [refetchTasks],
  );

  const updateTaskName = useCallback(
    async (id: string, name: string): Promise<void> => {
      await patchTaskApi(id, { name });
      await refetchTasks();

      toggleIsEditing(id, false);
    },
    [refetchTasks, toggleIsEditing],
  );

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    setTasks((old) => old.filter((task) => task.id !== id));
    deleteTaskApi(id).then();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editingTask,
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
