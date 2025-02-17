import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { Task } from "../models/task.ts";
import { deleteTaskApi, patchTaskApi } from "@/api/task.ts";

import useTasksQuery from "@/hooks/use-tasks-query.ts";

type ContextType = {
  tasks: Task[];
  editingTask: Task | null;
  toggleIsChecked: (ID: string, isChecked: boolean) => Promise<void>;
  updateTaskName: (ID: string, name: string) => Promise<void>;
  deleteTask: (ID: string) => Promise<void>;
  toggleIsEditing: (ID: string, isEditing: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  tasks: [],
  editingTask: null,
  toggleIsChecked: async () => {},
  deleteTask: async () => {},
  updateTaskName: async () => {},
  toggleIsEditing: () => {},
});

type Props = PropsWithChildren;

function TaskProvider({ children }: Props) {
  const { data: tasks } = useTasksQuery();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const toggleIsChecked = useCallback(
    async (id: string, isChecked: boolean): Promise<void> => {
      await patchTaskApi(id, { isChecked });
    },
    [],
  );

  const updateTaskName = useCallback(
    async (id: string, name: string): Promise<void> => {
      await patchTaskApi(id, { name });

      toggleIsEditing(id, false);
    },
    [toggleIsEditing],
  );

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    // setTasks((old) => old.filter((task) => task.id !== id));
    deleteTaskApi(id).then();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editingTask,
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
