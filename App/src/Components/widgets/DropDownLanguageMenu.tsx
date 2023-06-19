import LanguageIcon from "@mui/icons-material/Language";
import { Fade, IconButton, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import germanFlag from "../../assets/images/1200px-Flag_of_Germany.svg.webp";
import americanFlag from "../../assets/images/American flag.jpg";
import spanishFlag from "../../assets/images/Spanish flag.jpg";
import frenchFlag from "../../assets/images/french flag.jpg";
import portgueseFlag from "../../assets/images/portugal-flag.jpg";
import styles from "./DropDownLanguageMenu.module.css";

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
    useEffect(() => {
        function handleOutsideClick(event: any) {
            if (anchorEl && !anchorEl.contains(event.target)) {
                handleClose();
            }
        }

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [anchorEl]);
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
    // TODO: implement German/Portguese if needed
    const showGermanFlag = () => {
        setLanguage(3);
        i18n.changeLanguage("gr");
        setAnchorEl(null);
    };
    const showPortgueseFlag = () => {
        setLanguage(4);
        i18n.changeLanguage("pr");
        setAnchorEl(null);
    };
    return (
        <div className={styles.container}>
            <IconButton onClick={handleClick} className={styles.menuButton}>
                <LanguageIcon className={styles.globeIcon} />
            </IconButton>
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
                    <img src={frenchFlag} className={styles.flag} alt="French Flag" />
                    <Typography variant="body2">{t("navBar.french")}</Typography>
                </MenuItem>
                <MenuItem onClick={showSpanishFlag} className={styles.menuItem}>
                    <img src={spanishFlag} className={styles.flag} alt="Spanish Flag" />
                    <Typography variant="body2">{t("navBar.spanish")}</Typography>
                </MenuItem>
                <MenuItem onClick={showAmericanFlag} className={styles.menuItem}>
                    <img src={americanFlag} className={styles.flag} alt="American Flag" />
                    <Typography variant="body2">{t("navBar.english")}</Typography>
                </MenuItem>

                {/* TODO: add German flag  under germanFlag */}
                <MenuItem onClick={showGermanFlag} className={styles.menuItem}>
                    <img src={germanFlag} className={styles.flag} alt="German Flag" />
                    <Typography variant="body2">{t("navBar.german")}</Typography>
                </MenuItem>

                {/* TODO: add Portguese flag  under portgueseFlag */}
                <MenuItem onClick={showPortgueseFlag} className={styles.menuItem}>
                    <img src={portgueseFlag} className={styles.flag} alt="Portguese Flag" />
                    <Typography variant="body2">{t("navBar.portguese")}</Typography>
                </MenuItem>
            </Menu>

            {language === 4 ? (
                <img src={portgueseFlag} className={styles.currentLanguage} alt="Portguese Flag" />
            ) : language === 3 ? (
                <img src={germanFlag} className={styles.currentLanguage} alt="German Flag" />
            ) : language === 2 ? (
                <img src={spanishFlag} className={styles.currentLanguage} alt="Spanish Flag" />
            ) : language === 1 ? (
                <img src={frenchFlag} className={styles.currentLanguage} alt="French Flag" />
            ) : (
                <img src={americanFlag} className={styles.currentLanguage} alt="American Flag" />
            )}
        </div>
    );
};
