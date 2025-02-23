import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { LANGUAGE_KEY } from "@/constants/local-storage.constants.ts";

import enTranslation from "./locales/en/translation.json";
import faTranslation from "./locales/fa/translation.json";

export const defaultNS = "translation";

export const resources = {
  en: {
    translation: enTranslation,
  },
  fa: {
    translation: faTranslation,
  },
} as const;

function getLanguage(): string {
  const item = localStorage.getItem(LANGUAGE_KEY);

  if (!item || !["en", "fa"].includes(item)) {
    return "en";
  }

  return item;
}

i18next.use(initReactI18next).init({
  resources,
  ns: ["translation"],
  defaultNS,
  lng: getLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18next.language;
document.documentElement.dir = i18next.dir();
