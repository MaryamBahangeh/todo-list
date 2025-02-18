import { Add } from "iconsax-react";
import { useRef } from "react";

import TaskModal from "@/components/TaskModal/TaskModal.tsx";
import IconButton, {
  Shape,
  Size,
} from "@/components/IconButton/IconButton.tsx";
import styles from "./Footer.module.css";
import { Task } from "@/models/task.ts";
import { v4 as uuidv4 } from "uuid";

import useAddTaskMutation from "@/hooks/use-add-task-mutation.ts";
import { toast } from "react-toastify";
import { t } from "i18next";

function Footer() {
  const mutation = useAddTaskMutation();
  const ref = useRef<HTMLDialogElement | null>(null);

  const createTask = async (name: string): Promise<void> => {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      isChecked: false,
    };

    await mutation.mutateAsync(newTask);
    toast.success(t("modal.taskCreated"));
  };

  const applyClickHandler = async (text: string) => {
    await createTask(text);
    ref.current?.close();
  };

  const cancelClickHandler = () => {
    ref.current?.close();
  };

  const createButtonClickHandler = () => {
    ref.current?.showModal();
  };

  return (
    <footer className={styles.footer}>
      <IconButton
        icon={<Add color="white" />}
        shape={Shape.CIRCLE}
        size={Size.LARGE}
        onClick={createButtonClickHandler}
      />
      <TaskModal
        ref={ref}
        onApply={applyClickHandler}
        onCancel={cancelClickHandler}
      />
    </footer>
  );
}

export default Footer;
