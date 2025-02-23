import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";

import { IS_DARK_MODE_KEY } from "@/constants/local-storage.constants.ts";

type contextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<contextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

const defaultIsDarkMode = (): boolean => {
  if (localStorage.getItem(IS_DARK_MODE_KEY)) {
    return localStorage.getItem(IS_DARK_MODE_KEY)?.toString() === "true";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

type Props = PropsWithChildren;

function ThemeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultIsDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode((old) => !old);
    localStorage.setItem(IS_DARK_MODE_KEY, (!isDarkMode).toString());
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
