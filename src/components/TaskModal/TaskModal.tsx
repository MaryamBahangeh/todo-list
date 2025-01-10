import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useContext,
  useRef,
} from "react";

import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import Button, { Variant } from "../Button/Button.tsx";

import styles from "./TaskModal.module.css";

type Props = {
  onApply: (text: string) => void;
  onCancel: () => void;
};

function TaskModal(
  { onApply, onCancel }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const { findWordInDictionary } = useContext(DictionaryContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const cancelClickHandler = () => {
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
        <h2 className="h2">{findWordInDictionary("New Note")}</h2>

        <input ref={inputRef} />
        <div className={styles["actions"]}>
          <Button
            type="button"
            variant={Variant.OUTLINE}
            onClick={cancelClickHandler}
          >
            {findWordInDictionary("CANCEL")}
          </Button>

          <Button type="submit" onClick={onApplyHandler}>
            {findWordInDictionary("APPLY")}
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(TaskModal);
