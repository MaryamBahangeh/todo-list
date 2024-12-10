import "./App.css";

import Header from "./components/Header/Header.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";

import Tasks from "./components/Tasks/Tasks.tsx";

import Footer from "./components/Footer/Footer.tsx";
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import FilterProvider from "./providers/FilterProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import DictionaryProvider from "@/providers/DictionaryProvider.tsx";

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <DictionaryProvider>
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
        </DictionaryProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
