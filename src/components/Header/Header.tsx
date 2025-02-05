import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";

function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h1 className="h1">{t("app.title")}</h1>
    </header>
  );
}

export default Header;
