import { FormEvent, useEffect, useState } from "react";
import "react-dropdown/style.css";
import { List } from "../../models/list.ts";
import { DROPDOWN_OPTIONS } from "../../models/Item-state-dropdown-options.ts";
import Footer from "../Footer/Footer.tsx";
import NoResult from "../NoResult/NoResult.tsx";
import Search from "../Search/Search.tsx";
import Tasks from "../Tasks/Tasks.tsx";
import { DropdownOption } from "../../models/dropdown-option.ts";

function ToDoList() {
  const [toDoListItems, setToDoListItems] = useState<List[]>([]);
  const [originalToDoListItems, setOriginalToDoListItems] = useState<List[]>(
    [],
  );
  const [searchText, setSearchText] = useState("");
  const defaultOption = DROPDOWN_OPTIONS[0];
  const [dropdownSearch, setDropdownSearch] = useState(defaultOption);
  const [noResults, setNoResults] = useState(false);

  const applyClickHandler = (text: string) => {
    const old = [
      ...originalToDoListItems,
      {
        name: text,
        isChecked: false,
        editMode: false,
      },
    ];

    setOriginalToDoListItems([...old]);
    setToDoListItems([...old]);
    setSearchText("");
    setDropdownSearch(DROPDOWN_OPTIONS[0]);
    showNoResults(originalToDoListItems);
  };

  const searchHandler = () => {
    const filteredByText = [...originalToDoListItems].filter((list: List) =>
      list.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const filteredByDropdownSearch = filteredByText.filter((x: List) => {
      if (dropdownSearch.value === "all") return true;
      if (dropdownSearch.value === "incomplete") return !x.isChecked;
      if (dropdownSearch.value === "complete") return x.isChecked;
    });

    setToDoListItems([...filteredByDropdownSearch]);
    showNoResults([...filteredByDropdownSearch]);
  };

  const showNoResults = (resultList: List[]) => {
    if (resultList.length === 0) setNoResults(true);
    else setNoResults(false);
  };

  useEffect(() => {
    searchHandler();
  }, [dropdownSearch, searchText, originalToDoListItems]);

  const searchFormSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearchText(formData.get("search") as string);
  };

  return (
    <>
      <Search
        dropdownSearch={dropdownSearch}
        dropdownOnChange={(option: DropdownOption) => setDropdownSearch(option)}
        searchFormSubmit={searchFormSubmitHandler}
        serachTextOnchange={(value: string) => setSearchText(value)}
        searchText={searchText}
      />

      <NoResult noResults={noResults}></NoResult>

      <Tasks
        toDoListItems={toDoListItems}
        originalToDoListItems={originalToDoListItems}
        setOriginalToDoListItems={(items: List[]) =>
          setOriginalToDoListItems(items)
        }
        setToDoListItems={(items: List[]) => setToDoListItems(items)}
      ></Tasks>

      <Footer applyClick={(text: string) => applyClickHandler(text)}></Footer>
    </>
  );
}

export default ToDoList;
