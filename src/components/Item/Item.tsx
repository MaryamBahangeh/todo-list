import { ChangeEvent, useState } from "react";
import styles from "./Item.module.css";
import Button, { VARIANT } from "../Button/Button.tsx";
import { List } from "../../models/list.ts";

type Props = {
  currentItem: List;
  index: number;
  okButtonClick: (newValue: string, index: number) => void;
  cancelButtonClick: (index: number) => void;
  checkChangeHandler: (index: number, isChecked: boolean) => void;
};

function Item({
  currentItem,
  index,
  okButtonClick,
  cancelButtonClick,
  checkChangeHandler,
}: Props) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const [value, setValue] = useState(currentItem.name);

  return (
    <>
      <label
        style={{ display: currentItem.editMode ? "none" : "" }}
        htmlFor={`checkbox-${index}`}
        className={currentItem.isChecked ? styles["checked-note"] : ""}
      >
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={currentItem.isChecked}
          onChange={(e) => checkChangeHandler(index, e.target.checked)}
        />
        {currentItem.name}
      </label>

      <div
        className={styles["edit-container"]}
        style={{ display: currentItem.editMode ? "" : "none" }}
      >
        <input
          id={`editInput-${index}`}
          value={value}
          key={index}
          onChange={onChangeHandler}
        />
        <Button
          variant={VARIANT.FILL}
          onClick={() => {
            okButtonClick(value, index);
          }}
        >
          OK
        </Button>
        <Button
          variant={VARIANT.OUTLINE}
          onClick={() => {
            cancelButtonClick(index);
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default Item;
