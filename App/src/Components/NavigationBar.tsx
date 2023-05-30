import styles from "./NavigationBar.module.css";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../context/authContext";
import { Container } from "./core/layout/Container";
import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { DropDownProfileMenu } from "./widgets/DropDownProfileMenu";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
    const { t } = useTranslation();
    const { loggedInUser, setUserInContext } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUserInContext(null);
    };
    return (
        <AppBar sx={{ backgroundColor: "white" }}>
            <Container>
                <Toolbar className={styles.navbar}>
                    <div className={styles.leftSide}>
                        <Link to={"/"}>
                            <div className={styles.logo}>{t("navBar.logo")}</div>
                        </Link>
                    </div>
                    <div className={styles.rightSide}>
                        <DropDownProfileMenu
                            currentUser={loggedInUser}
                            handleLogout={handleLogout}
                        />
                        <DropDownLanguageMenu />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
