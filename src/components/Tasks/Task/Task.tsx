import { ChangeEvent, useContext, useState } from "react";
import styles from "./Task.module.css";
import Button, { VARIANT } from "../../Button/Button.tsx";
import { Edit, Trash } from "iconsax-react";
import { List } from "../../../models/list.ts";
import Input from "../../Input/Input.tsx";
import { TaskContext } from "../../../providers/TaskProvider.tsx";

type Props = {
  currentItem: List;
};

function Task({ currentItem }: Props) {
  const { toggleIsDone, deleteNote, updateNote, makeEditable } =
    useContext(TaskContext);
  const [value, setValue] = useState(currentItem.name);

  return (
    <div className={styles.item}>
      <label
        style={{ display: currentItem.editMode ? "none" : "" }}
        className={currentItem.isChecked ? styles["checked-note"] : ""}
      >
        <input
          type="checkbox"
          checked={currentItem.isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            toggleIsDone(currentItem.id, e.target.checked)
          }
        />
        {currentItem.name}
      </label>

      <form
        className={styles["edit-container"]}
        style={{ display: currentItem.editMode ? "" : "none" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          variant={VARIANT.FILL}
          onClick={() => {
            updateNote(currentItem.id, value);
          }}
          type="submit"
        >
          OK
        </Button>
        <Button
          type="button"
          variant={VARIANT.OUTLINE}
          onClick={() => {
            makeEditable(currentItem.id, false);
          }}
        >
          Cancel
        </Button>
      </form>
      <div
        className={styles["button-container"]}
        style={{ display: currentItem.editMode ? "none" : "" }}
      >
        <button onClick={() => makeEditable(currentItem.id, true)}>
          <Edit className={styles.edit} />
        </button>
        <button onClick={() => deleteNote(currentItem.id)}>
          <Trash className={styles.delete} />
        </button>
      </div>
    </div>
  );
}

export default Task;
