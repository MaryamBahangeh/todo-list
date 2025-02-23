import { Add } from "iconsax-react";
import { useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { t } from "i18next";

import { Task } from "@/models/task.ts";
import useAddTaskMutation from "@/hooks/use-add-task-mutation.ts";

import Button from "@/components/Button/Button.tsx";
import TaskModal from "@/components/TaskModal/TaskModal.tsx";

function AddButton() {
  const mutation = useAddTaskMutation();
  const ref = useRef<HTMLDialogElement | null>(null);

  const addTask = async (name: string): Promise<void> => {
    const newTask: Task = {
      id: uuidv4(),
      name: name,
      isChecked: false,
    };

    await mutation.mutateAsync(newTask);
    toast.success(t("modal.taskAdded"));
  };

  const applyClickHandler = async (text: string) => {
    await addTask(text);
    ref.current?.close();
  };

  const cancelClickHandler = () => {
    ref.current?.close();
  };

  const addButtonClickHandler = () => {
    ref.current?.showModal();
  };

  return (
    <>
      <Button onClick={addButtonClickHandler}>
        <Add color="white" /> Add Task
      </Button>
      <TaskModal
        ref={ref}
        onApply={applyClickHandler}
        onCancel={cancelClickHandler}
      />
    </>
  );
}

export default AddButton;
