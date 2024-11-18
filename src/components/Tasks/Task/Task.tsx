import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Task.module.css";
import Button, { VARIANT } from "../../Button/Button.tsx";
import { Edit, Trash } from "iconsax-react";
import { List } from "../../../models/list.ts";
import Input from "../../Input/Input.tsx";

type Props = {
  currentItem: List;
  index: number;
  okButtonClick: (newValue: string, index: number) => void;
  cancelButtonClick: (index: number) => void;
  checkChange: (index: number, isChecked: boolean) => void;
  makeEditable: (index: number, editMode: boolean) => void;
  deleteButtonHandler: (index: number) => void;
};

function Task({
  currentItem,
  index,
  okButtonClick,
  cancelButtonClick,
  checkChange,
  makeEditable,
  deleteButtonHandler,
}: Props) {
  const [value, setValue] = useState(currentItem.name);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    okButtonClick(value, index);
  };

  return (
    <div className={styles.item}>
      <label
        style={{ display: currentItem.editMode ? "none" : "" }}
        htmlFor={`checkbox-${index}`}
        className={currentItem.isChecked ? styles["checked-note"] : ""}
      >
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={currentItem.isChecked}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            checkChange(index, e.target.checked)
          }
        />
        {currentItem.name}
      </label>

      <form
        className={styles["edit-container"]}
        style={{ display: currentItem.editMode ? "" : "none" }}
        onSubmit={onSubmitHandler}
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          variant={VARIANT.FILL}
          onClick={() => {
            okButtonClick(value, index);
          }}
          type="submit"
        >
          OK
        </Button>
        <Button
          type="button"
          variant={VARIANT.OUTLINE}
          onClick={() => {
            cancelButtonClick(index);
          }}
        >
          Cancel
        </Button>
      </form>
      <div
        className={styles["button-container"]}
        style={{ display: currentItem.editMode ? "none" : "" }}
      >
        <button onClick={() => makeEditable(index, true)}>
          <Edit className={styles.edit} />
        </button>
        <button onClick={() => deleteButtonHandler(index)}>
          <Trash className={styles.delete} />
        </button>
      </div>
    </div>
  );
}

export default Task;
