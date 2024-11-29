import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
type Props = PropsWithChildren;
type contextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};
export const ThemeContext = createContext<contextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function ThemeProvider({ children }: Props) {
  const defaultTheme = () => {
    if (localStorage.getItem("isDarkMode")) {
      return localStorage.getItem("isDarkMode")?.toString() === "true";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultTheme);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", (!isDarkMode).toString());
  };

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
