import { FC } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, IconButton, Rating, styled } from "@mui/material";
import { Location } from "../../models/Location";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Typography } from "../core/Typography";
import styles from "./CardLocation.module.css";
import { apiCalls } from "../../api/api";
import { Link } from "react-router-dom";

interface CardLocationProps {
  location: Location;
}
const FavoriteButton = styled(IconButton)({
  position: "absolute",
  backgroundColor: "white",
  top: 6,
  right: 10,
  zIndex: 10,
});
const StarsRating = styled(Rating)({
  "&.MuiRating-root": {
    color: "blue",
  },
});

export const CardLocation: FC<CardLocationProps> = ({ location }) => {
  const locationActivities = apiCalls.getActivitiesForLocation(location).length;
  const { t } = useTranslation();
  return (
    <Card className={styles.item} sx={{ width: 320, height: 350 }}>
      <FavoriteButton>
        <FavoriteIcon />
      </FavoriteButton>
      <Link key={location.id} to={`/location/${location.id}`}>
        <CardActionArea sx={{ height: "100%" }}>
          <div>
            <CardMedia
              component="img"
              image={location.coverImage}
              alt="Location Cover"
              className={styles.image}
              sx={{ height: 235 }}
            />
          </div>

          <CardContent className={styles.locationContent}>
            <Typography text={location.name} variant="h4" />
            <Typography text={location.country} />
            <div className={styles.locationActivities}>
              <Typography text={locationActivities} variant="body2" />
              <Typography text={t("common.activities")} variant="body2" />
            </div>
            <StarsRating
              name="half-rating"
              defaultValue={location.averageRating}
              precision={0.5}
              readOnly
              sx={{}}
            />
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
