import styles from "./ToDoList.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Add, Edit, SearchNormal, Trash } from "iconsax-react";
import Modal from "../Modal/Modal.tsx";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Item from "../Item/Item.tsx";
import Button, { RADIUS, VARIANT } from "../Button/Button.tsx";
import { List } from "../../models/list.ts";
import { ITEM_STATE_DROPDOWN_OPTIONS } from "../../models/item-state-dropdown-options.ts";
import Input from "../Input/Input.tsx";

function ToDoList() {
  const [openModal, setOpenModal] = useState(false);
  const [toDoListItems, setToDoListItems] = useState<List[]>([]);
  const [originalToDoListItems, setOriginalToDoListItems] = useState<List[]>(
    [],
  );
  const [searchText, setSearchText] = useState("");

  const defaultOption = ITEM_STATE_DROPDOWN_OPTIONS[0];
  const [dropdownSearch, setDropdownSearch] = useState(defaultOption);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    searchHandler();
  }, [originalToDoListItems, dropdownSearch, searchText]);

  const checkChangeHandler = (index: number, isChecked: boolean) => {
    setOriginalToDoListItems((old) => {
      const result = [...old];

      old[index].isChecked = isChecked;

      return result;
    });
  };

  const deleteButtonHandler = (index: number) => {
    setOriginalToDoListItems((old) => {
      const result = [...old];

      result.splice(index, 1);

      return result;
    });
  };

  const makeEditable = (index: number, editMode: boolean) => {
    setOriginalToDoListItems((old) => {
      const result = [...old];

      old[index].editMode = editMode;

      return result;
    });
  };

  const okButtonHandler = (newValue: string, index: number) => {
    setOriginalToDoListItems((old) => {
      const result = [...old];

      old[index].editMode = false;
      old[index].name = newValue;

      return result;
    });
  };

  const cancelButtonHandler = (index: number) => {
    makeEditable(index, false);
  };

  const applyClickHandler = (text: string) => {
    setOriginalToDoListItems((old) => [
      ...old,
      {
        name: text,
        isChecked: false,
        editMode: false,
      },
    ]);

    setToDoListItems([...originalToDoListItems]);
    setOpenModal(false);
    setSearchText("");
    setDropdownSearch(ITEM_STATE_DROPDOWN_OPTIONS[0]);
    showNoResults(originalToDoListItems);
  };

  const searchFormSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setSearchText(formData.get("search") as string);
  };

  const searchHandler = () => {
    const itemsFilteredByName = originalToDoListItems.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const itemsFilteredByIsChecked = itemsFilteredByName.filter((item) => {
      if (dropdownSearch.value === "complete" && item.isChecked) {
        return true;
      }

      if (dropdownSearch.value === "incomplete" && !item.isChecked) {
        return true;
      }

      return dropdownSearch.value === "all";
    });

    showNoResults(itemsFilteredByIsChecked);
    setToDoListItems(itemsFilteredByIsChecked);
  };

  const showNoResults = (resultList: List[]) => {
    if (resultList.length === 0) setNoResults(true);
    else setNoResults(false);
  };

  return (
    <div className={styles["to-do-list"]}>
      <h1 className="typography-main-title">To Do List</h1>
      <form
        className={styles["search-container"]}
        onSubmit={searchFormSubmitHandler}
      >
        <div className={styles.search}>
          <Input defaultValue={""} />
          <SearchNormal />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            options={ITEM_STATE_DROPDOWN_OPTIONS}
            className={styles.dropdown}
            value={dropdownSearch}
            onChange={(option) => setDropdownSearch(option)}
          />
        </div>
      </form>
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
