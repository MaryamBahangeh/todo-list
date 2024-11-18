import "./App.css";
import "./styles/color.css";
import "./styles/typography.css";
import ToDoList from "./components/ToDoList/ToDoList.tsx";
import Header from "./components/Header/Header.tsx";

function App() {
  return (
    <div className="app">
      <Header />
      <ToDoList />
    </div>
  );
}

export default App;
