import { FormEvent, useContext, useState } from "react";
import styles from "../../Task.module.css";
import Button, { Variant } from "../../../../Button/Button.tsx";
import { Task as TaskModel } from "../../../../../models/task.ts";
import Input from "../../../../Input/Input.tsx";
import { TaskContext } from "../../../../../providers/TaskProvider.tsx";

type Props = {
  currentItem: TaskModel;
};

function Task({ currentItem }: Props) {
  const { updateTaskName, toggleIsEditing } = useContext(TaskContext);

  const [value, setValue] = useState(currentItem.name);

  const cancelButtonClickHandler = (): void => {
    toggleIsEditing(currentItem.id, false);
    setValue(currentItem.name);
  };

  const formSubmitHandler = (e: FormEvent): void => {
    e.preventDefault();
    updateTaskName(currentItem.id, value);
  };

  return (
    <form className={styles.edit} onSubmit={formSubmitHandler}>
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />

      <Button variant={Variant.OUTLINE} onClick={cancelButtonClickHandler}>
        Cancel
      </Button>
      <Button>OK</Button>
    </form>
  );
}

export default Task;
