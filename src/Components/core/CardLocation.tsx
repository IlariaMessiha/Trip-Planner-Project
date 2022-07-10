import { FC } from "react";

import { Location } from "../../models/Location";
import { Typography } from "../core/Typography";
import styles from "./CardLocation.module.css";

interface CardLocationProps {
  location: Location;
}

export const CardLocation: FC<CardLocationProps> = ({ location }) => {
  return (
    <div key={location.id} className={styles.item}>
      <img src={location.coverImage} alt="" className={styles.image} />
      <Typography text={location.name} variant="h4" />
      <Typography text={location.country} />
      <Typography text={location.activities} variant="body2" />
      <Typography text="activities" variant="body2" />
    </div>
  );
};
