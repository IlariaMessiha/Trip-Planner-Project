import EditIcon from "@mui/icons-material/Edit";
import styles from "./NavigationBar.module.css";
import { Typography } from "./core/Typography";

import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Container } from "./core/layout/Container";
import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { DropDownProfileMenu } from "./widgets/DropDownProfileMenu";
import { useAuthContext } from "../context/authContext";

export const NavigationBar = () => {
    const { t } = useTranslation();
    const { loggedInUser, setUserInContext } = useAuthContext();

    const handleLogout = () => {
        setUserInContext(null);
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
                        <IconButton>
                            <EditIcon className={styles.icon} />
                        </IconButton>

                        <Typography text={t("common.review")} />
                    </div>

                    <DropDownProfileMenu currentUser={loggedInUser} handleLogout={handleLogout} />
                    <DropDownLanguageMenu />
                </div>
            </Container>
        </nav>
    );
};
