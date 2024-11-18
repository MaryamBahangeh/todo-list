import styles from "./Modal.module.css";
import { useState } from "react";
import Button, { VARIANT } from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";

type Props = {
  applyClick: (text: string) => void;
  cancelClick: () => void;
};
function Modal({ applyClick, cancelClick }: Props) {
  const [noteText, setNoteText] = useState("");

  return (
    <div className={styles.container}>
      <form className={styles.modal} onSubmit={(e) => e.preventDefault()}>
        <h2 className="typography-title">New Note</h2>

        <Input value={noteText} onChange={(e) => setNoteText(e.target.value)} />

        <div className={styles["button-container"]}>
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
    </div>
  );
}

export default Modal;
