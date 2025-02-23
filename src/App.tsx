import "./App.css";

import Header from "./components/Header/Header.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";

import Tasks from "./components/Tasks/Tasks.tsx";

import Toolbar from "./components/Toolbar/Toolbar.tsx";
import FilterProvider from "./providers/FilterProvider.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import QueryProvider from "@/providers/QueryProvider.tsx";
import Toast from "@/components/Toast/Toast.tsx";

function App() {
  return (
    <div className="app">
      <QueryProvider>
        <ThemeProvider>
          <FilterProvider>
            <TaskProvider>
              <Header />
              <main>
                <Toolbar />
                <Tasks />
              </main>
              <Toast />
            </TaskProvider>
          </FilterProvider>
        </ThemeProvider>
      </QueryProvider>
    </div>
  );
}

export default App;
