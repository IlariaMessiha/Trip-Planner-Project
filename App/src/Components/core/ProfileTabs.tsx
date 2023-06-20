import CreateIcon from "@mui/icons-material/Create";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, Tab } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
interface ProfileTabsProps {
    value: string;
    handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}
export const ProfileTabs: FC<ProfileTabsProps> = ({ value, handleChange }) => {
    const { t } = useTranslation();
    return (
        <Box sx={{ typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        variant="fullWidth"
                        aria-label="lab API tabs example"
                        onChange={handleChange}
                    >
                        <Tab icon={<CreateIcon />} iconPosition="start" label="Reviews" value="1" />
                        <Tab
                            icon={<FavoriteIcon />}
                            iconPosition="start"
                            label={t("user.favorites")}
                            value="2"
                        />
                        <Tab
                            icon={<LocalAirportIcon />}
                            iconPosition="start"
                            label={t("user.trips")}
                            value="3"
                        />
                    </TabList>
                </Box>
            </TabContext>
        </Box>
    );
};
