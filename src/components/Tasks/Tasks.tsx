import { useContext, useEffect, useState } from "react";

import { FilterContext } from "@/providers/FilterProvider.tsx";
import NoResult from "@/components/NoResult/NoResult.tsx";
import Task from "./Task/Task.tsx";

import { Task as TaskModel } from "@/models/task.ts";

import styles from "./Tasks.module.css";

function Tasks() {
  const { filteredTasks } = useContext(FilterContext);

  const [tasks, setTasks] = useState<TaskModel[] | null>(null);

  useEffect(() => {
    console.log("here");

    const fetchTasks = async (): Promise<void> => {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks().then();
  }, []);

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
