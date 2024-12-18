import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction, useEffect,
  useState,
} from "react";
import dictionary from "../assets/dictionary/dictionary.json";
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
  findWordInDictionary: (name: string) => string;
};

export const DictionaryContext = createContext<ContextType>({
  language: 'en',
  setLanguage: () => {},
  findWordInDictionary: () => "",
});

function DictionaryProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<string>(defaultLanguage);

  const findWordInDictionary = (name: string) => {
    if (!dictionary[name]) {
      return "Not found in the dictionary!";
    }
    if (!dictionary[name][language]) {
      return dictionary[name]["en"];
    }
    return dictionary[name][language];
  };

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.dir=  language === "fa" ? "rtl" : "ltr"
  }, [language]);

  return (
    <DictionaryContext.Provider
      value={{ language, setLanguage, findWordInDictionary }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}

export default DictionaryProvider;
