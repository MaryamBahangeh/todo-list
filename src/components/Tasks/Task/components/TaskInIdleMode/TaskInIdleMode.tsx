import { ChangeEvent, useContext } from "react";
import styles from "./TaskInIdleMode.module.css";
import { Edit, Trash } from "iconsax-react";
import { Task as TaskModel } from "../../../../../models/task.ts";
import { TaskContext } from "../../../../../providers/TaskProvider.tsx";
import IconButton, {
  VariantIconButton,
} from "../../../../IconButton/IconButton.tsx";

type Props = {
  currentItem: TaskModel;
};

function TaskInIdleMode({ currentItem }: Props) {
  const { toggleIsChecked, deleteTask, toggleIsEditing } =
    useContext(TaskContext);

  return (
    <div className={styles.idle}>
      <label>
        <input
          type="checkbox"
          checked={currentItem.isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            toggleIsChecked(currentItem.id, e.target.checked)
          }
        />
        <div className={styles.name}>{currentItem.name}</div>
      </label>

      <div className={styles["actions"]}>
        <IconButton
          onClick={() => toggleIsEditing(currentItem.id, true)}
          className={styles.edit}
          variantIconButton={VariantIconButton.GHOST}
          icon={<Edit />}
        />
        <IconButton
          onClick={() => deleteTask(currentItem.id)}
          className={styles.remove}
          variantIconButton={VariantIconButton.GHOST}
          icon={<Trash />}
        />
      </div>
    </div>
  );
}

export default TaskInIdleMode;
