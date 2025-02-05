import { useTranslation } from "react-i18next";

import styles from "./NoReasult.module.css";

function NoResult() {
  const { t } = useTranslation();

  return (
    <div className={styles["no-results"]}>
      <img alt="" src="/images/no-result.svg" />
      <span></span>

      <span>{t("list.empty")}...</span>
    </div>
  );
}

export default NoResult;
