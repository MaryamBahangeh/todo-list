import { Task } from "@/models/task.ts";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/tasks");
  return await response.json();
};

export const addTaskApi = async (task: Task): Promise<void> => {
  await fetch(`http://localhost:3000/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
  });
};

export const updateTaskApi = async (task: Task): Promise<void> => {
  await fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
};

export const filterTasksApi = async (name: string): Promise<Task[]> => {
  const response = await fetch(`http://localhost:3000/tasks?name=${name}`, {
    method: "GET",
  });
  return await response.json();
};
