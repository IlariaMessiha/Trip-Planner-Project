import { useState } from "react";
import styles from "./NavigationBar.module.css";
import { FaPen, FaUser } from "react-icons/fa";
import { Typography } from "./core/Typography";
import { Container } from "./core/Container";
import { useTranslation } from "react-i18next";

import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";

export const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<number>(0);

  // useEffect(() => {
  //   if (localStorage.getItem("i18nextLng") !== null) {
  //     if (localStorage.getItem("i18nextLng").length > 2) {
  //       i18next.changeLanguage("en");
  //     }
  //   }
  // }, []);

  return (
    <nav>
      <Container className={styles.navbarContainer}>
        <div className={styles.leftSide}>
          <a href="/">
            <div className={styles.logo}>{t("navBar.logo")}</div>
          </a>
        </div>
        <div className={styles.rightSide}>
          {/*  TODO ADD ICON */}
          <div className={styles.review}>
            <FaPen />

            <Typography text={t("navBar.review")} />
          </div>

          <div className={styles.profilePage}>
            <FaUser />
          </div>

          <DropDownLanguageMenu />
        </div>
      </Container>
    </nav>
  );
};
