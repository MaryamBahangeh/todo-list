import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import dictionary from "../assets/dictionary/dictionary.json";
import { Language_KEY } from "@/constants/local-storage.constants.ts";

const defaultLanguage = (): string => {
  if (!localStorage.getItem(Language_KEY)) {
    return "en";
  }
  return localStorage.getItem(Language_KEY) as string;
};

type contextType = {
  findWordInDictionary: (name: string) => string;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
};

export const DictionaryContext = createContext<contextType>({
  language: defaultLanguage(),
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

  useMemo(() => {
    localStorage.setItem(Language_KEY, language);
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
