import { Task as TaskModel } from "../../../models/task.ts";
import TaskInEditingMode from "./components/TaskInEditingMode/TaskInEditingMode.tsx";
import TaskInIdleMode from "./components/TaskInIdleMode/TaskInIdleMode.tsx";

type Props = {
  currentItem: TaskModel;
};

function Task({ currentItem }: Props) {
  if (currentItem.isEditing) {
    return <TaskInEditingMode currentItem={currentItem} />;
  }

  return <TaskInIdleMode currentItem={currentItem} />;
}

export default Task;
