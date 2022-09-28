import { useTranslation } from "react-i18next";
import { FC } from "react";
import { apiCalls } from "../../api/api";
import { Location } from "../../models/Location";
import { CardActivity } from "../core/CardActivity";
import { Typography } from "../core/Typography";
import styles from "./LocationTopAttraction.module.css";
import { Swiper } from "./Swiper";

interface LocationTopAttractionProps {
  location: Location;
}
export const LocationTopAttraction: FC<LocationTopAttractionProps> = ({
  location,
}) => {
  const result = apiCalls.getActivitiesForLocation(location);
  const { t } = useTranslation();
  return (
    <div className={styles.topAttraction}>
      <div className={styles.topAttractionHeader}>
        <Typography
          text={t("Locations.locationPage.topAttraction")}
          variant="h2"
        />
        <Typography
          text={t("Locations.locationPage.topAttractionSlogan")}
          variant="body1"
        />
      </div>

      <div className={styles.topAttractionSwiper}>
        <Swiper
          items={result}
          renderItem={(activity) => <CardActivity activity={activity} />}
        />
      </div>
    </div>
  );
};
