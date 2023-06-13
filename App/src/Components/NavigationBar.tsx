import styles from "./NavigationBar.module.css";

import LoginIcon from "@mui/icons-material/Login";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Container } from "./core/layout/Container";
import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { DropDownProfileMenu } from "./widgets/DropDownProfileMenu";
import SearchIcon from "@mui/icons-material/Search";

export const NavigationBar = () => {
    const { t } = useTranslation();
    const { loggedInUser, setUserInContext } = useAuthContext();
    const navigate = useNavigate();

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
                        <IconButton
                            onClick={() => {
                                navigate("/search");
                            }}
                        >
                            <SearchIcon sx={{ color: "black" }} />
                        </IconButton>
                        {loggedInUser ? (
                            <>
                                <DropDownProfileMenu
                                    currentUser={loggedInUser}
                                    handleLogout={handleLogout}
                                />
                            </>
                        ) : (
                            <>
                                <IconButton
                                    onClick={() => {
                                        navigate("/auth/login");
                                    }}
                                >
                                    <LoginIcon
                                        className={styles.profileIcon}
                                        sx={{ color: "black" }}
                                    />
                                </IconButton>
                            </>
                        )}
                        <DropDownLanguageMenu />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
