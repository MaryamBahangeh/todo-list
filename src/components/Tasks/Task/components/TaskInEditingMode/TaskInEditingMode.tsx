import { FormEvent, useContext, useState } from "react";

import { Task as TaskModel } from "../../../../../models/task.ts";
import { DictionaryContext } from "@/providers/DictionaryProvider.tsx";
import Button, { Variant } from "@/components/Button/Button.tsx";

import { TaskContext } from "@/providers/TaskProvider.tsx";
import Input from "@/components/Input/Input.tsx";

import styles from "./TaskInEditingMode.module.css";

type Props = {
  currentItem: TaskModel;
};

function Task({ currentItem }: Props) {
  const { findWordInDictionary } = useContext(DictionaryContext);
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
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <Input value={value} onChange={(e) => setValue(e.currentTarget.value)} />

      <Button variant={Variant.OUTLINE} onClick={cancelButtonClickHandler}>
        {findWordInDictionary("CANCEL")}
      </Button>
      <Button>{findWordInDictionary("APPLY")}</Button>
    </form>
  );
}

export default Task;
