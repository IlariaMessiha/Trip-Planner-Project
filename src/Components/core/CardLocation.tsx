import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Location } from "../../models/Location";
import { Typography } from "../core/Typography";
import styles from "./CardLocation.module.css";

interface CardLocationProps {
  location: Location;
}

export const CardLocation: FC<CardLocationProps> = ({ location }) => {
  const { t } = useTranslation();
  return (
    <div key={location.id} className={styles.item}>
      <img src={location.coverImage} alt="Cover" className={styles.image} />
      <Typography text={location.name} variant="h4" />
      <Typography text={location.country} />
      <Typography text={location.activities} variant="body2" />
      <Typography text={t("common.activities")} variant="body2" />
    </div>
  );
};
