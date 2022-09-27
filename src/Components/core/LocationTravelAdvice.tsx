import styles from "./LocationTravelAdvice.module.css";
import { Typography } from "./Typography";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WineBarRoundedIcon from "@mui/icons-material/WineBarRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { green, pink, purple, yellow } from "@mui/material/colors";
import { LocationTravelAdviceCard } from "./LocationTravelAdviceCard";
import { useTranslation } from "react-i18next";
export const LocationTravelAdvice = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        text={t("Locations.locationPage.travelAdvice")}
        variant="h2"
      />
      <div className={styles.travelAdvice}>
        <LocationTravelAdviceCard text={t("Locations.locationPage.advice1")}>
          <WbSunnyRoundedIcon
            sx={{ color: pink[300], paddingLeft: 2 }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text={t("Locations.locationPage.advice2")}>
          <DirectionsRunRoundedIcon
            sx={{ color: yellow[700] }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text={t("Locations.locationPage.advice3")}>
          <WineBarRoundedIcon sx={{ color: purple[300] }} fontSize="large" />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text={t("Locations.locationPage.advice4")}>
          <TipsAndUpdatesRoundedIcon
            sx={{ color: green[500] }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
      </div>
    </>
  );
};
