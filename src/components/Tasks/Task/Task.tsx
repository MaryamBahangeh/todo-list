import styles from "./Task.module.css";
import { Task as TaskModel } from "../../../models/task.ts";
import TaskInEditingMode from "./components/TaskInEditingMode/TaskInEditingMode.tsx";
import TaskInIdleMode from "./components/TaskInIdleMode/TaskInIdleMode.tsx";

type Props = {
  currentItem: TaskModel;
};

function Task({ currentItem }: Props) {
  return (
    <div className={styles.item}>
      {currentItem.isEditing ? (
        <TaskInEditingMode currentItem={currentItem} />
      ) : (
        <TaskInIdleMode currentItem={currentItem} />
      )}
    </div>
  );
}

export default Task;
