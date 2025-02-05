import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import i18n from "i18next";

import { LANGUAGE_KEY } from "@/constants/local-storage.constants.ts";

const defaultLanguage = (): string => {
  if (!localStorage.getItem(LANGUAGE_KEY)) {
    return "en";
  }
  return localStorage.getItem(LANGUAGE_KEY) as string;
};

type ContextType = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const DictionaryContext = createContext<ContextType>({
  language: "en",
  setLanguage: () => {},
});

function DictionaryProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<string>(defaultLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);

    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  return (
    <DictionaryContext.Provider value={{ language, setLanguage }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export default DictionaryProvider;
