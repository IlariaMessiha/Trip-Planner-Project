import styles from "./NavigationBar.module.css";

import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useTranslation } from "react-i18next";

import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { Container } from "./core/layout/Container";
import { IconButton } from "@mui/material";
import { Card } from "react-bootstrap";

export const NavigationBar = () => {
    const { t } = useTranslation();

    return (
        <AppBar sx={{ backgroundColor: "white" }}>
            <Container className={styles.container}>
                <Toolbar className={styles.navbar}>
                    <div className={styles.leftSide}>
                        <a href="/">
                            <div className={styles.logo}>{t("navBar.logo")}</div>
                        </a>
                    </div>
                    <div className={styles.rightSide}>
                        {/*  TODO ADD ICON */}

                        <IconButton className={styles.profilePage}>
                            <PersonIcon className={styles.icon} />
                        </IconButton>
                        <DropDownLanguageMenu />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
