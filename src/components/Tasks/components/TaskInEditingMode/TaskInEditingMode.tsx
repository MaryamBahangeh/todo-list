import { FormEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import Button, { Variant } from "@/components/Button/Button.tsx";
import Input from "@/components/Input/Input.tsx";

import { Task as TaskModel } from "@/models/task.ts";

import { TaskContext } from "@/providers/TaskProvider.tsx";

import styles from "./TaskInEditingMode.module.css";

type Props = {
  currentItem: TaskModel;
};

function Task({ currentItem }: Props) {
  const { updateTaskName, toggleIsEditing } = useContext(TaskContext);

  const { t } = useTranslation();

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

      <Button
        type="button"
        variant={Variant.OUTLINE}
        onClick={cancelButtonClickHandler}
      >
        {t("form.cancel")}
      </Button>
      <Button>{t("form.apply")}</Button>
    </form>
  );
}

export default Task;
