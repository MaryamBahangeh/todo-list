import { Task } from "@/models/task.ts";

import { Filters } from "@/types/filters.ts";

const BASE_URL = "http://localhost:3000/tasks";

export const fetchTasks = async (filters?: Filters): Promise<Task[]> => {
  const params = new URLSearchParams(generateFilterParams(filters));

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  return await response.json();
};

export const addTaskApi = async (task: Task): Promise<void> => {
  await fetch(`${BASE_URL}`, {
    method: "POST",
    body: JSON.stringify(task),
  });
};

export const updateTaskApi = async (task: Task): Promise<void> => {
  await fetch(`${BASE_URL}/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

const generateFilterParams = (filters?: Filters): Record<string, string> => {
  return {
    ...generateNameFilterParam(filters),
    ...generateIsCheckedFilterParam(filters),
  };
};

const generateNameFilterParam = (filters?: Filters): Record<string, string> => {
  if (!filters?.name) {
    return {};
  }

  return { name: filters.name };
};

const generateIsCheckedFilterParam = (
  filters?: Filters,
): Record<string, string> => {
  if (!filters?.noteType || filters.noteType.value === "all") {
    return {};
  }

  const isChecked = filters.noteType.value === "complete" ? "true" : "false";

  return { isChecked };
};
