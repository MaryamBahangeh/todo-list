import styles from "./Tasks.module.css";
import { Task as TaskModel } from "../../models/task.ts";
import Task from "./Task/Task.tsx";
import { useContext } from "react";
import { filterContext } from "../../providers/FilterProvider.tsx";
import NoResult from "../NoResult/NoResult.tsx";

function Tasks() {
  const { filteredTasks } = useContext(filterContext);

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
