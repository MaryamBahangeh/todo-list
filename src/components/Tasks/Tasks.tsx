import { useContext } from "react";

import { Task as TaskModel } from "../../models/task.ts";

import { FilterContext } from "../../providers/FilterProvider.tsx";

import NoResult from "../NoResult/NoResult.tsx";
import Task from "./Task/Task.tsx";

import styles from "./Tasks.module.css";

function Tasks() {
  const { filteredTasks } = useContext(FilterContext);

  return (
    <div className={styles.container}>
      <ul>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task: TaskModel) => (
            <li key={task.id}>
              <Task currentItem={task} />
            </li>
          ))
        ) : (
          <NoResult />
        )}
      </ul>
    </div>
  );
}

export default Tasks;
