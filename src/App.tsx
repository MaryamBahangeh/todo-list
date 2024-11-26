import "./App.css";
import "./styles/color.css";
import "./styles/typography.css";
import "./styles/general.css";
import "./styles/shadows.css";
import "./styles/animation.css";

import Header from "./components/Header/Header.tsx";
import TaskProvider from "./providers/TaskProvider.tsx";

import NoResult from "./components/NoResult/NoResult.tsx";
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
              <NoResult />
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
