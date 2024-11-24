import "./App.css";
import "./styles/color.css";
import "./styles/typography.css";

import Header from "./components/Header/Header.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";

import NoResult from "./components/NoResult/NoResult.tsx";
import Tasks from "./components/Tasks/Tasks.tsx";

import Footer from "./components/Footer/Footer.tsx";
import Search from "./components/Search/Search.tsx";

function App() {
  return (
    <div className="app">
      <TaskProvider>
        <Header />

        <main>
          <Search />
          <NoResult />
          <Tasks />
        </main>

        <Footer />
      </TaskProvider>
    </div>
  );
}

export default App;
