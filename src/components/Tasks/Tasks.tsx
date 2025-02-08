import { useContext } from "react";

import NoResult from "@/components/NoResult/NoResult.tsx";
import Task from "./Task/Task.tsx";

import { Task as TaskModel } from "@/models/task.ts";

import styles from "./Tasks.module.css";
import { TaskContext } from "@/providers/TaskProvider.tsx";

function Tasks() {
  const { tasks, isLoading } = useContext(TaskContext);

  if (isLoading) {
    return <div className={styles.container}>در حال بارگذاری...</div>;
  }

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
            <Task currentItem={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
