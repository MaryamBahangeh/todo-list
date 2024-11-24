import styles from "./TaskModal.module.css";
import { ForwardedRef, forwardRef, ReactElement, useState } from "react";
import Button, { VARIANT } from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";

type Props = {
  applyClick: (text: string) => void;
  cancelClick: () => void;
};
function TaskModal(
  { applyClick, cancelClick }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const [noteText, setNoteText] = useState("");

  return (
    <dialog ref={ref} className={styles.container}>
      <form className={styles.modal} onSubmit={(e) => e.preventDefault()}>
        <h2 className="typography-title">New Note</h2>

        <Input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Input your note..."
        />

        <div className={styles["actions"]}>
          <Button type="button" onClick={cancelClick} variant={VARIANT.OUTLINE}>
            cancel
          </Button>

          <Button
            type="submit"
            variant={VARIANT.FILL}
            onClick={() => applyClick(noteText)}
          >
            apply
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(TaskModal);
