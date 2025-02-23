import { ForwardedRef, forwardRef, ReactElement, useRef } from "react";

import { useTranslation } from "react-i18next";

import Button, { Variant } from "@/components/Button/Button.tsx";

import styles from "./TaskModal.module.css";

type Props = {
  onApply: (text: string) => void;
  onCancel: () => void;
};

function TaskModal(
  { onApply, onCancel }: Props,
  ref?: ForwardedRef<HTMLDialogElement>,
): ReactElement {
  const { t } = useTranslation();

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
        <h2 className="h2">{t("modal.title")}</h2>

        <input ref={inputRef} />
        <div className={styles["actions"]}>
          <Button
            type="button"
            variant={Variant.OUTLINE}
            onClick={cancelClickHandler}
          >
            {t("form.cancel")}
          </Button>

          <Button type="submit" onClick={onApplyHandler}>
            {t("form.apply")}
          </Button>
        </div>
      </form>
    </dialog>
  );
}

export default forwardRef(TaskModal);
