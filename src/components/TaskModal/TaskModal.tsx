import styles from "./TaskModal.module.css";
import { ForwardedRef, forwardRef, ReactElement, useRef } from "react";
import Button, { Variant } from "../Button/Button.tsx";

type Props = {
  applyClick: (text: string) => void;
  cancelClick: () => void;
};
function TaskModal(
  { applyClick, cancelClick }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelClickHandler = () => {
    if (inputRef.current) inputRef.current.value = "";
    cancelClick();
  };

  const applyClickHandler = () => {
    if (inputRef.current) {
      applyClick(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <dialog ref={ref} className={styles.container}>
      <form className={styles.modal} onSubmit={(e) => e.preventDefault()}>
        <h2 className="typography-title">New Note</h2>

        <input ref={inputRef} />
        <div className={styles["actions"]}>
          <Button
            type="button"
            variant={Variant.OUTLINE}
            onClick={cancelClickHandler}
          >
            Cancel
          </Button>

          <Button type="submit" onClick={applyClickHandler}>
            Apply
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(TaskModal);
