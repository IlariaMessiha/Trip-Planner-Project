import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Avatar, Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import { Container } from "../Components/core/layout/Container";
import styles from "./ProfilePage.module.css";
import { fetchData } from "../api/FetchData";
import { ReviewDto } from "../types/dto/common/ReviewDto";
import { AttractionReviewList } from "../Components/widgets/AttractionReviewList";
import { ReviewPost } from "../Components/core/ReviewPost";
import { ReviewList } from "../Components/widgets/ReviewList";

export const ProfilePage = () => {
    const { loggedInUser, setUserInContext } = useAuthContext();
    const [value, setValue] = useState<string>("1");
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const token = localStorage.getItem("accessToken");

    if (!loggedInUser || !token) {
        return null;
    }
    const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        if (newValue === "1") {
            const response = await fetchData.getProfileReviews(loggedInUser.id, token);
            setReviews(response);
            console.log(response);
        }
    };

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
                {value === "1" && <ReviewList reviews={reviews} />}
            </Paper>
        </Container>
    );
};
