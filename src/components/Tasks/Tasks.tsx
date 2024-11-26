import styles from "./Tasks.module.css";
import { List } from "../../models/list.ts";
import Task from "./Task/Task.tsx";
import { useContext } from "react";
import { FilterContext } from "../../providers/FilterProvider.tsx";

function Tasks() {
  const { filteredTasks } = useContext(FilterContext);

  return (
    <div className={styles.container}>
      <div className={styles.checklist}>
        {filteredTasks.map((item: List) => (
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
