import { createContext, PropsWithChildren, useState } from "react";

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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (isDarkMode: boolean): void => {
    setIsDarkMode(isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
