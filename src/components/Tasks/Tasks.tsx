import styles from "./Tasks.module.css";
import { List } from "../../models/list.ts";
import Task from "./Task/Task.tsx";
import { useContext } from "react";
import { TaskContext } from "../../providers/TaskProvider.tsx";

function Tasks() {
  const { searchedTasks } = useContext(TaskContext);
  return (
    <div className={styles.container}>
      <div className={styles.checklist}>
        {searchedTasks.map((item: List) => (
          <div className={styles.items}>
            <Task currentItem={item} />
            <div className={styles.line}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
