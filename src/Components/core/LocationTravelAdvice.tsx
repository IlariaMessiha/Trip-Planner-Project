import { Card, CardContent, CardMedia } from "@mui/material";
import styles from "./LocationTravelAdvice.module.css";
import { Typography } from "./Typography";
import bestTimeToVisit from "../../assets/images/best time to visit.jpg";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import WineBarRoundedIcon from "@mui/icons-material/WineBarRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import { green, pink, purple, yellow } from "@mui/material/colors";
export const LocationTravelAdvice = () => {
  return (
    <>
      <Typography text="Travel Advice " variant="h2" />
      <div className={styles.travelAdvice}>
        <Card
          sx={{
            display: "flex",
            width: "250px",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <WbSunnyRoundedIcon sx={{ color: pink[300] }} fontSize="large" />
          <CardContent>
            <Typography text="Best time to Visit" variant="h4" />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            width: "250px",
            alignItems: "center",
          }}
        >
          <DirectionsRunRoundedIcon
            sx={{ color: yellow[700] }}
            fontSize="large"
          />

          <CardContent>
            <Typography text="Best time to Visit" variant="h4" />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            width: "250px",
            alignItems: "center",
          }}
        >
          <TipsAndUpdatesRoundedIcon
            sx={{ color: purple[300] }}
            fontSize="large"
          />
          <CardContent>
            <Typography text="Best time to Visit" variant="h4" />
          </CardContent>
        </Card>
        <Card
          sx={{
            display: "flex",
            width: "250px",
            alignItems: "center",
          }}
        >
          <WineBarRoundedIcon sx={{ color: green[500] }} fontSize="large" />
          <CardContent>
            <Typography text="Best time to Visit" variant="h4" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
