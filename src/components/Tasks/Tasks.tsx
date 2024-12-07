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
      <div className={styles.checklist}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item: TaskModel) => (
            <div className={styles.items}>
              <Task currentItem={item} />
            </div>
          ))
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
}

export default Tasks;
