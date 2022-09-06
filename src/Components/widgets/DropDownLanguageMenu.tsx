import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styles from "./DropDownLanguageMenu.module.css";
import frenchFlag from "../../assets/images/french flag.jpg";
import americanFlag from "../../assets/images/American flag.jpg";
import spanishFlag from "../../assets/images/Spanish flag.jpg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
import { Typography } from "../core/Typography";
import { ClickAwayListener, Fade } from "@mui/material";
import i18n from "../../i18n";

export const DropDownLanguageMenu = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showAmericanFlag = () => {
    setLanguage(0);
    i18n.changeLanguage("en");
    setAnchorEl(null);
  };
  const showFrenchFlag = () => {
    setLanguage(1);
    i18n.changeLanguage("fr");
    setAnchorEl(null);
  };
  const showSpanishFlag = () => {
    setLanguage(2);
    i18n.changeLanguage("sp");
    setAnchorEl(null);
  };
  return (
    <div className={styles.container}>
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={styles.menuButton}
      >
        <FaGlobe className={styles.icon} />
      </Button>

      <Menu
        sx={{ width: 200 }}
        className={styles.menu}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        closeAfterTransition
        hideBackdrop
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={showFrenchFlag} className={styles.menuItem}>
          <img src={frenchFlag} className={styles.flag} />
          <Typography variant="body2" text={t("navBar.french")} />
        </MenuItem>
        <MenuItem onClick={showSpanishFlag} className={styles.menuItem}>
          <img src={spanishFlag} className={styles.flag} />
          <Typography variant="body2" text={t("navBar.spanish")} />
        </MenuItem>
        <MenuItem onClick={showAmericanFlag} className={styles.menuItem}>
          <img src={americanFlag} className={styles.flag} />
          <Typography variant="body2" text={t("navBar.english")} />
        </MenuItem>
      </Menu>

      {language === 2 ? (
        <img src={spanishFlag} className={styles.currentLanguage} />
      ) : language === 1 ? (
        <img src={frenchFlag} className={styles.currentLanguage} />
      ) : (
        <img src={americanFlag} className={styles.currentLanguage} />
      )}
    </div>
  );
};
