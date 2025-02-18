import { ChangeEvent, useContext } from "react";
import { Edit, Trash } from "iconsax-react";

import IconButton, {
  VariantIconButton,
} from "@/components/IconButton/IconButton.tsx";

import { TaskContext } from "@/providers/TaskProvider.tsx";

import { Task as TaskModel } from "@/models/task.ts";
import useUpdateTaskMutation from "@/hooks/use-update-task-mutation.ts";

import styles from "./TaskInIdleMode.module.css";

type Props = {
  currentItem: TaskModel;
};

function TaskInIdleMode({ currentItem }: Props) {
  const { deleteTask, toggleIsEditing } = useContext(TaskContext);
  const mutation = useUpdateTaskMutation();

  return (
    <div className={styles.idle}>
      <label>
        <input
          type="checkbox"
          checked={currentItem.isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            mutation.mutateAsync({
              id: currentItem.id,
              partialTask: { isChecked: e.target.checked },
            })
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
