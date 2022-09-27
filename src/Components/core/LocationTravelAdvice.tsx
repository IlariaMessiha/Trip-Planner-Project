import styles from "./LocationTravelAdvice.module.css";
import { Typography } from "./Typography";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WineBarRoundedIcon from "@mui/icons-material/WineBarRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { green, pink, purple, yellow } from "@mui/material/colors";
import { LocationTravelAdviceCard } from "./LocationTravelAdviceCard";
export const LocationTravelAdvice = () => {
  return (
    <>
      <Typography text="Travel Advice " variant="h2" />
      <div className={styles.travelAdvice}>
        <LocationTravelAdviceCard text="Best Time To Visit">
          <WbSunnyRoundedIcon
            sx={{ color: pink[300], paddingLeft: 2 }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text="Best Time To Visit">
          <DirectionsRunRoundedIcon
            sx={{ color: yellow[700] }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text="Best Time To Visit">
          <TipsAndUpdatesRoundedIcon
            sx={{ color: purple[300] }}
            fontSize="large"
          />
        </LocationTravelAdviceCard>
        <LocationTravelAdviceCard text="Best Time To Visit">
          <WineBarRoundedIcon sx={{ color: green[500] }} fontSize="large" />
        </LocationTravelAdviceCard>
      </div>
    </>
  );
};
