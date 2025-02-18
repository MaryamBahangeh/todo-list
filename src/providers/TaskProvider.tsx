import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { Task } from "../models/task.ts";

import useTasksQuery from "@/hooks/use-tasks-query.ts";

type ContextType = {
  editingTask: Task | null;
  toggleIsEditing: (ID: string, isEditing: boolean) => void;
};

export const TaskContext = createContext<ContextType>({
  editingTask: null,
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

  return (
    <TaskContext.Provider
      value={{
        editingTask,
        toggleIsEditing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
