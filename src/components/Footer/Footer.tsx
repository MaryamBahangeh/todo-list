import Button, { RADIUS, VARIANT } from "../Button/Button.tsx";
import { Add } from "iconsax-react";

import { useContext, useRef } from "react";
import { TaskContext } from "../../providers/TaskProvider.tsx";
import TaskModal from "../TaskModal/TaskModal.tsx";

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
  const clickButtonHandler = () => {
    ref.current?.show();
  };

  return (
    <footer>
      <Button
        variant={VARIANT.FILL}
        icon={<Add color="white" />}
        onClick={clickButtonHandler}
        radius={RADIUS.Round}
        style={{ justifySelf: "end" }}
      ></Button>

      <TaskModal
        applyClick={(text: string) => applyClickHandler(text)}
        cancelClick={cancelClickHandler}
        ref={ref}
      />
    </footer>
  );
}

export default Footer;
