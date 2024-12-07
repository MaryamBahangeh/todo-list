import styles from "./TaskModal.module.css";
import { ForwardedRef, forwardRef, ReactElement, useRef } from "react";
import Button, { Variant } from "../Button/Button.tsx";

type Props = {
  onApply: (text: string) => void;
  onCancel: () => void;
};
function TaskModal(
  { onApply, onCancel }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const cncalClickHandler = () => {
    if (inputRef.current) inputRef.current.value = "";
    onCancel();
  };

  const onApplyHandler = () => {
    if (!inputRef.current) {
      return;
    }

    onApply(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <dialog ref={ref} className={styles.container}>
      <form className={styles.modal} onSubmit={(e) => e.preventDefault()}>
        <h2 className="h2">New Note</h2>

        <input ref={inputRef} />
        <div className={styles["actions"]}>
          <Button
            type="button"
            variant={Variant.OUTLINE}
            onClick={cncalClickHandler}
          >
            Cancel
          </Button>

          <Button type="submit" onClick={onApplyHandler}>
            Apply
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(TaskModal);
