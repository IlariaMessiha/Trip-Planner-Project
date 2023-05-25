import styles from "./NavigationBar.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "./core/Typography";
import { useTranslation } from "react-i18next";
import { DropDownLanguageMenu } from "./widgets/DropDownLanguageMenu";
import { DropDownProfileMenu } from "./widgets/DropDownProfileMenu";
import { Container } from "./core/layout/Container";
import { IconButton } from "@mui/material";
import AuthService from "../services/auth.service";
import React, { useState, useEffect } from "react";

export const NavigationBar = (props: any) => {
    const { t } = useTranslation();
    
    

    

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

                    <DropDownProfileMenu
                        currentUser={props.currentUser}
                        handleLogout={props.handleLogout}
                    />
                    <DropDownLanguageMenu />
                </div>
            </Container>
        </nav>
    );
};
