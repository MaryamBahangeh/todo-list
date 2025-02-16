import { useContext } from "react";

import NoResult from "@/components/NoResult/NoResult.tsx";

import { Task as TaskModel } from "@/models/task.ts";

import { TaskContext } from "@/providers/TaskProvider.tsx";

import TaskInEditingMode from "./components/TaskInEditingMode/TaskInEditingMode.tsx";
import TaskInIdleMode from "./components/TaskInIdleMode/TaskInIdleMode.tsx";

import styles from "./Tasks.module.css";

function Tasks() {
  const { tasks, editingTask } = useContext(TaskContext);

  console.log("rendering tasks...");
  console.log(editingTask);

  if (tasks.length === 0) {
    return (
      <div className={styles.container}>
        <ul>
          <NoResult />
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul>
        {tasks.map((task: TaskModel) => (
          <li key={task.id}>
            {task === editingTask ? (
              <TaskInEditingMode currentItem={task} />
            ) : (
              <TaskInIdleMode currentItem={task} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
