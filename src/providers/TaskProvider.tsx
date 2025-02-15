import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { Task } from "../models/task.ts";
import { deleteTaskApi, patchTaskApi } from "@/api/task.ts";
import useTasksQuery from "@/hooks/use-tasks-query.ts";
import useAddTaskMutation from "@/hooks/use-add-task-mutation.ts";
import { toast } from "react-toastify";

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
  const { data: tasks } = useTasksQuery();
  const { mutateAsync: addMutateAsync } = useAddTaskMutation();

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

  const createTask = useCallback(
    async (name: string): Promise<void> => {
      const newTask: Task = {
        id: uuidv4(),
        name: name,
        isChecked: false,
      };

      await addMutateAsync(newTask);
      toast.success("Task created.");
    },
    [addMutateAsync],
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
