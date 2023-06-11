import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Avatar, Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Container } from "../Components/core/layout/Container";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
    const { loggedInUser, setUserInContext } = useAuthContext();
    const [value, setValue] = useState<string>("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        console.log(value, newValue);
    };
    if (!loggedInUser) {
        return null;
    }
    return (
        <Container className={styles.container}>
            <Paper className={styles.header}>
                <div className={styles.userInfo}>
                    <Avatar sx={{ width: 80, height: 80, fontSize: "xx-large" }}>
                        {loggedInUser.firstName.charAt(0)}
                    </Avatar>
                    <div>
                        <Typography variant="h4">
                            {loggedInUser?.firstName} {loggedInUser.lastName}
                        </Typography>
                        <Typography variant="subtitle2">{loggedInUser?.email}</Typography>
                    </div>
                </div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList aria-label="lab API tabs example" onChange={handleChange}>
                                <Tab label="Reviews" value="1" />
                                <Tab label="Favorites" value="2" />
                                <Tab label="Trips" value="3" />
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
            </Paper>
            <Paper className={styles.content}>
                <div>PageContent</div>
            </Paper>
        </Container>
    );
};
