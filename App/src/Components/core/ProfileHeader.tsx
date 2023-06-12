import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Avatar, Box, Paper, Tab, Typography } from "@mui/material";
import { FC } from "react";
import { UserDto } from "../../types/dto/common/UserDto";
import styles from "./ProfileHeader.module.css";

interface ProfileHeaderProps {
    loggedInUser: UserDto;
    value: string;
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}
export const ProfileHeader: FC<ProfileHeaderProps> = ({ loggedInUser, value, handleChange }) => {
    return (
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
    );
};
