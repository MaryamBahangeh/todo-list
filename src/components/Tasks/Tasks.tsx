import styles from "./Tasks.module.css";
import { List } from "../../models/list.ts";
import Task from "./Task/Task.tsx";

type Props = {
  toDoListItems: List[];
  originalToDoListItems: List[];
  setOriginalToDoListItems: (originalToDoListItems: List[]) => void;
  setToDoListItems: (toDoListItems: List[]) => void;
};
function Tasks({
  toDoListItems,
  originalToDoListItems,
  setOriginalToDoListItems,
  setToDoListItems,
}: Props) {
  const checkChangeHandler = (index: number, isChecked: boolean) => {
    const old = [...originalToDoListItems];
    old[index].isChecked = isChecked;
    setOriginalToDoListItems([...old]);
  };

  const deleteButtonHandler = (index: number) => {
    const old = [...originalToDoListItems];
    old.splice(index, 1);
    setOriginalToDoListItems([...old]);
  };

  const makeEditable = (index: number, editMode: boolean) => {
    const x = [...toDoListItems];
    x[index].editMode = editMode;
    setToDoListItems([...x]);
  };

  const okButtonHandler = (newValue: string, index: number) => {
    const old = [...originalToDoListItems];

    old[index].editMode = false;
    old[index].name = newValue;

    setOriginalToDoListItems([...old]);
  };

  const cancelButtonHandler = (index: number) => {
    makeEditable(index, false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.checklist}>
        {toDoListItems.map((item: List, index) => (
          <div className={styles.items}>
            <Task
              currentItem={item}
              index={index}
              okButtonClick={okButtonHandler}
              cancelButtonClick={cancelButtonHandler}
              checkChange={checkChangeHandler}
              deleteButtonHandler={deleteButtonHandler}
              makeEditable={() => makeEditable(index, true)}
            />
            <div className={styles.line}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
