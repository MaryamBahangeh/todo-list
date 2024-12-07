import styles from "./Footer.module.css";
import { Add } from "iconsax-react";
import { useContext, useRef } from "react";
import { TaskContext } from "../../providers/TaskProvider.tsx";
import TaskModal from "../TaskModal/TaskModal.tsx";
import IconButton, { Shape, Size } from "../IconButton/IconButton.tsx";

function Footer() {
  const { createTask } = useContext(TaskContext);

  const ref = useRef<HTMLDialogElement | null>(null);

  const applyClickHandler = (text: string) => {
    createTask(text);
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
