import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";
import IconButton from "@/components/IconButton/IconButton.tsx";
import { Moon, Sun } from "iconsax-react";
import Select from "@/components/Select/Select.tsx";
import i18next from "i18next";
import { LANGUAGE_DROPDOWN_OPTIONS } from "@/dropdown-options/item.dropdown-options.ts";
import { DropdownOption } from "@/models/dropdown-option.ts";
import { LANGUAGE_KEY } from "@/constants/local-storage.constants.ts";
import { ThemeContext } from "@/providers/ThemeProvider.tsx";
import { useContext } from "react";
import AddButton from "@/components/AddButton/AddButton.tsx";

function Header() {
  const { t } = useTranslation();

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const languageChangeHandler = async (
    option: DropdownOption,
  ): Promise<void> => {
    try {
      await i18next.changeLanguage(option.value);

      localStorage.setItem(LANGUAGE_KEY, option.value);

      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    } catch (err) {
      console.log("Something went wrong loading", err);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className="h1">{t("app.title")}</h1>
      <div className={styles.actions}>
        <AddButton />
        <IconButton
          icon={!isDarkMode ? <Moon /> : <Sun />}
          onClick={toggleDarkMode}
        />
        <Select
          defaultValue={i18next.language}
          onChange={languageChangeHandler}
          options={LANGUAGE_DROPDOWN_OPTIONS}
        ></Select>
      </div>
    </header>
  );
}

export default Header;
