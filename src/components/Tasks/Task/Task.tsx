import { ChangeEvent, useContext, useState } from "react";
import styles from "./Task.module.css";
import Button, { Variant } from "../../Button/Button.tsx";
import { Edit, Trash } from "iconsax-react";
import { List } from "../../../models/list.ts";
import Input from "../../Input/Input.tsx";
import { TaskContext } from "../../../providers/TaskProvider.tsx";
import IconButton, { VariantIconButton } from "../../IconButton/IconButton.tsx";

type Props = {
  currentItem: List;
};

function Task({ currentItem }: Props) {
  const { toggleIsDone, deleteNote, updateNote, makeEditable } =
    useContext(TaskContext);
  const [value, setValue] = useState(currentItem.name);

  const onCancelClick = () => {
    makeEditable(currentItem.id, false);
    setValue(currentItem.name);
  };

  return (
    <div className={styles.item}>
      <label
        style={{ display: currentItem.editMode ? "none" : "" }}
        // className={currentItem.isChecked ? styles["checked-note"] : ""}
      >
        <input
          type="checkbox"
          checked={currentItem.isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            toggleIsDone(currentItem.id, e.target.checked)
          }
        />
        <div className={styles.name}> {currentItem.name}</div>
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

        <Button variant={Variant.OUTLINE} onClick={onCancelClick}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            updateNote(currentItem.id, value);
          }}
        >
          ok
        </Button>
      </form>
      <div
        className={styles["actions"]}
        style={{ display: currentItem.editMode ? "none" : "" }}
      >
        <IconButton
          onClick={() => makeEditable(currentItem.id, true)}
          className={styles.edit}
          variantIconButton={VariantIconButton.GHOST}
          icon={<Edit />}
        />
        <IconButton
          onClick={() => deleteNote(currentItem.id)}
          className={styles.remove}
          variantIconButton={VariantIconButton.GHOST}
          icon={<Trash />}
        />
      </div>
    </div>
  );
}

export default Task;
