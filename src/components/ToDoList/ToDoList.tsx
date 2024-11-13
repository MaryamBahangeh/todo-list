import styles from "./ToDoList.module.css";
import { ChangeEvent, useState } from "react";
import { Add, Edit, SearchNormal, Trash } from "iconsax-react";
import Modal from "../Modal/Modal.tsx";

import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import Item from "../Item/Item.tsx";
import Button, { RADIUS, VARIANT } from "../Button/Button.tsx";
import { List } from "../../models/list.ts";
import { ITEM_STATE_DROPDOWN_OPTIONS } from "../../models/item-state-dropdown-options.ts";

function ToDoList() {
  const [openModal, setOpenModal] = useState(false);
  const [toDoListItems, setToDoListItems] = useState<List[]>([]);
  const [originalToDoListItems, setoriginalToDoListItems] = useState<List[]>(
    [],
  );
  const [searchText, setSearchText] = useState("");

  const defaultOption = ITEM_STATE_DROPDOWN_OPTIONS[0];
  const [dropdownSearch, setDropdownSearch] = useState(defaultOption);
  const [noResults, setNoResults] = useState(false);

  const checkChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    originalToDoListItems[Number(e.target.value)].isChecked = e.target.checked;
    searchHandler(dropdownSearch);
  };

  const deleteButtonHandler = (index: number) => {
    originalToDoListItems.splice(index, 1);
    searchHandler(dropdownSearch);
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
    searchHandler(dropdownSearch);
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
    setDropdownSearch(ITEM_STATE_DROPDOWN_OPTIONS[0]);
    showNoResults(originalToDoListItems);
  };

  const searchHandler = (option: Option) => {
    setDropdownSearch(option);
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

  const showNoResults = (resultList: List[]) => {
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
              if (e.key == "Enter") searchHandler(dropdownSearch);
            }}
          />
          <SearchNormal />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            options={ITEM_STATE_DROPDOWN_OPTIONS}
            className={styles.dropdown}
            value={dropdownSearch}
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
          {toDoListItems.map((item: List, index) => (
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
