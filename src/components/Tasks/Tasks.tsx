import { useContext } from "react";

import NoResult from "@/components/NoResult/NoResult.tsx";
import Task from "./Task/Task.tsx";

import { Task as TaskModel } from "@/models/task.ts";

import styles from "./Tasks.module.css";
import { TaskContext } from "@/providers/TaskProvider.tsx";

function Tasks() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className={styles.container}>
      {!tasks ? (
        "در حال بارگذاری..."
      ) : (
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task: TaskModel) => (
              <li key={task.id}>
                <Task currentItem={task} />
              </li>
            ))
          ) : (
            <NoResult />
          )}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
