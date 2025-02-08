import { Task } from "@/models/task.ts";

const BASE_URL = "http://localhost:3000/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}`);
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

export const filterTasksApi = async (name: string): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}?name=${name}`, {
    method: "GET",
  });
  return await response.json();
};
