import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";

type Props = PropsWithChildren;

type ContextType = {
  isDarkMode: boolean;
  toggleDarkMode: (isDarkMode: boolean) => void;
};

export const ThemeContext = createContext<ContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

function ThemeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = (isDarkMode: boolean): void => {
    setIsDarkMode(isDarkMode);

    const theme = isDarkMode ? "dark" : "light";

    localStorage.setItem("theme", theme);

    document.documentElement.dataset.theme = theme;
  };

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      return;
    }

    toggleDarkMode(theme === "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
