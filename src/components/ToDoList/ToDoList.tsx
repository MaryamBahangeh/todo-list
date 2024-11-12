import styles from "./ToDoList.module.css";
import { ChangeEvent, useState } from "react";
import { Add, Edit, Moon, SearchNormal, Trash } from "iconsax-react";
import Modal from "../Modal/Modal.tsx";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Item, { list } from "../Item/Item.tsx";
import Button, { RADIUS, VARIANT } from "../Button/Button.tsx";

function ToDoList() {
  const [openModal, setOpenModal] = useState(false);
  const [toDoListItems, setToDoListItems] = useState<list[]>([]);
  const [originalToDoListItems, setoriginalToDoListItems] = useState<list[]>(
    [],
  );
  const [searchText, setSearchText] = useState("");
  const options = [
    { value: "2", label: "All" },
    { value: "1", label: "Complete" },
    { value: "0", label: "Incomplete" },
  ];
  const defaultOption = options[0];
  const [drpSearch, setDrpSearch] = useState(defaultOption);
  const [noResults, setNoResults] = useState(false);

  const checkChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    originalToDoListItems[Number(e.target.value)].isChecked = e.target.checked;
    searchHandler(drpSearch);
  };

  const deleteButtonHandler = (index: number) => {
    originalToDoListItems.splice(index, 1);
    searchHandler(drpSearch);
  };

  const makeEditable = (index: number, editMode: boolean) => {
    const x = [...toDoListItems];
    x[index].editMode = editMode;
    setToDoListItems([...x]);
  };

  const okButtonHandler = (newValue: string, index: number) => {
    originalToDoListItems.map((x, listIndex) => {
      if (listIndex === index) {
        x.editMode = false;
        x.name = newValue;
      }
    });
    searchHandler(drpSearch);
  };

  const cancelButtonHandler = (index: number) => {
    makeEditable(index, false);
  };

  const applyClickHandler = (text: string) => {
    originalToDoListItems.push({
      name: text,
      isChecked: false,
      editMode: false,
    });
    setToDoListItems([...originalToDoListItems]);
    setOpenModal(false);
    setSearchText("");
    setDrpSearch(options[0]);
    showNoResults(originalToDoListItems);
  };

  const searchHandler = (option: { value: string; label: string }) => {
    setDrpSearch(option);
    const x = originalToDoListItems.filter((item) => {
      return (
        (item.name.search(searchText) != -1 || searchText === "") &&
        (Number(item.isChecked) === Number(option.value) ||
          option.value === "2")
      );
    });
    showNoResults(x);
    setToDoListItems(x);
  };

  const showNoResults = (resultList: list[]) => {
    if (resultList.length === 0) setNoResults(true);
    else setNoResults(false);
  };

  return (
    <div className={styles["to-do-list"]}>
      <span className="typography-main-title">To Do List</span>
      <div className={styles["search-container"]}>
        <div className={styles.search}>
          <input
            placeholder="Search note..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") searchHandler(drpSearch);
            }}
          />
          <SearchNormal />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            options={options}
            className={styles.dropdown}
            value={drpSearch}
            onChange={searchHandler}
          />
        </div>
      </div>
      <div
        className={styles["no-results"]}
        style={{ display: noResults ? "" : "none" }}
      >
        <img alt="" src="./images/noResult.svg" />
        <span>Empty...</span>
      </div>

      <div className={styles.container}>
        <div className={styles.checklist}>
          {toDoListItems.map((item: list, index) => (
            <div className={styles.items}>
              <div className={styles.item}>
                <Item
                  currentItem={item}
                  index={index}
                  okButtonClick={okButtonHandler}
                  cancelButtonClick={cancelButtonHandler}
                  checkChangeHandler={checkChangeHandler}
                />

                <div
                  className={styles["button-container"]}
                  style={{ display: item.editMode ? "none" : "" }}
                >
                  <button onClick={() => makeEditable(index, true)}>
                    <Edit className={styles.edit} />
                  </button>
                  <button onClick={() => deleteButtonHandler(index)}>
                    <Trash className={styles.delete} />
                  </button>
                </div>
              </div>
              <div className={styles.line}></div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={VARIANT.FILL}
        icon={<Add color="white" />}
        onClick={() => setOpenModal(true)}
        radius={RADIUS.Round}
        style={{ justifySelf: "end" }}
      ></Button>

      {openModal && (
        <Modal
          applyClick={applyClickHandler}
          cancelClick={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default ToDoList;
