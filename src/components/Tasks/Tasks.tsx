import styles from "./Tasks.module.css";
import { Task } from "../../models/task.ts";
import Task from "./Task/Task.tsx";
import { useContext } from "react";
import { filterContext } from "../../providers/FilterProvider.tsx";

function Tasks() {
  const { filteredTasks } = useContext(filterContext);

  return (
    <div className={styles.container}>
      <div className={styles.checklist}>
        {filteredTasks.map((item: Task) => (
          <div className={styles.items}>
            <Task currentItem={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
