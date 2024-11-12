import styles from "./Modal.module.css";
import { useState } from "react";
import Button, { VARIANT } from "../Button/Button.tsx";
// import Input from "../input/input.tsx";

type props = {
  applyClick: (text: string) => void;
  cancelClick: () => void;
};
function Modal({ applyClick, cancelClick }: props) {
  const [noteText, setNoteText] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <span className="typography-title">New Note</span>
        <input
          type="text"
          required
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") applyClick(noteText);
          }}
        />
        <div className={styles["button-container"]}>
          <Button onClick={cancelClick} variant={VARIANT.OUTLINE}>
            cancel
          </Button>
          <Button variant={VARIANT.FILL} onClick={() => applyClick(noteText)}>
            apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
