import { useContext } from "react";
import { Edit, Trash } from "iconsax-react";
import { toast } from "react-toastify";
import { t } from "i18next";

import useDeleteTaskMutation from "@/hooks/use-delete-task-mutation.ts";
import useUpdateTaskMutation from "@/hooks/use-update-task-mutation.ts";

import { TaskContext } from "@/providers/TaskProvider.tsx";

import IconButton, {
  VariantIconButton,
} from "@/components/IconButton/IconButton.tsx";

import { Task, Task as TaskModel } from "@/models/task.ts";

import styles from "./TaskInIdleMode.module.css";

type Props = {
  currentItem: TaskModel;
};

function TaskInIdleMode({ currentItem }: Props) {
  const { toggleIsEditing } = useContext(TaskContext);
  const updateMutation = useUpdateTaskMutation();
  const deleteMutation = useDeleteTaskMutation();

  const deleteClickHandler = async (id: Task["id"]) => {
    await deleteMutation.mutateAsync(id);
    toast.success(t("modal.taskDeleted"));
  };

  return (
    <div className={styles.idle}>
      <label>
        <input
          type="checkbox"
          checked={currentItem.isChecked}
          onChange={(e) =>
            updateMutation.mutateAsync({
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
          onClick={() => deleteClickHandler(currentItem.id)}
          className={styles.remove}
          variantIconButton={VariantIconButton.GHOST}
          icon={<Trash />}
        />
      </div>
    </div>
  );
}

export default TaskInIdleMode;
