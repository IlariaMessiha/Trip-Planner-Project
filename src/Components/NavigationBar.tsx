import { FC, useEffect, useState } from "react";
import styles from "./NavigationBar.module.css";
import { FaGlobe, FaPen, FaUser } from "react-icons/fa";
import { Typography } from "./core/Typography";
import { Container } from "./core/Container";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Dropdown from "react-bootstrap/Dropdown";
import frenchFlag from "../assets/images/french flag.jpg";
import americanFlag from "../assets/images/American flag.jpg";
import spanishFlag from "../assets/images/Spanish flag.jpg";
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
  const showAmericanFlag = () => {
    setLanguage(0);
    i18n.changeLanguage("en");
  };
  const showFrenchFlag = () => {
    setLanguage(1);
    i18n.changeLanguage("fr");
  };
  const showSpanishFlag = () => {
    setLanguage(2);
    i18n.changeLanguage("sp");
  };

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
          <Dropdown>
            <Dropdown.Toggle className={styles.dropDownButton}>
              <FaGlobe />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropDownMenu}>
              <Dropdown.Item
                className={styles.dropDownItem}
                onClick={showAmericanFlag}
              >
                <img src={americanFlag} />
                <Typography variant="body2" text="English" />
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropDownItem}
                onClick={showSpanishFlag}
              >
                <img src={spanishFlag} />
                <Typography variant="body2" text="Spanish" />
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropDownItem}
                onClick={showFrenchFlag}
              >
                <img src={frenchFlag} />
                <Typography variant="body2" text="French" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {language === 2 ? (
            <img src={spanishFlag} className={styles.currentLanguage} />
          ) : language === 1 ? (
            <img src={frenchFlag} className={styles.currentLanguage} />
          ) : (
            <img src={americanFlag} className={styles.currentLanguage} />
          )}
        </div>
      </Container>
    </nav>
  );
};
