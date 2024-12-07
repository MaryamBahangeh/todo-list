import "./App.css";

import Header from "./components/Header/Header.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";

import Tasks from "./components/Tasks/Tasks.tsx";

import Footer from "./components/Footer/Footer.tsx";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import FilterProvider from "./providers/FilterProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <TaskProvider>
          <FilterProvider>
            <Header />

            <main>
              <Toolbar />
              <Tasks />
            </main>

            <Footer />
          </FilterProvider>
        </TaskProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
