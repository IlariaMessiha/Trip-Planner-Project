import { FC } from "react";
import { Typography } from "./Typography";
import { Location } from "../../models/Location";
import { GrLocation } from "react-icons/gr";
import styles from "./LocationSearchResult.module.css";
import { useTranslation } from "react-i18next";

interface LocationSearchResultProps {
  location: Location;
}
export const LocationSearchResult: FC<LocationSearchResultProps> = ({
  location,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.searchResultElement}>
      {/* <div className={styles.rightSide}></div> */}

      <a href={`/location/${location.id}`}>
        <img src={location.coverImage} alt="Cover" />
      </a>

      <div className={styles.rightSide}>
        <a href={`/location/${location.id}`}>
          <Typography text={location.name} variant="h3" />
        </a>

        <div className={styles.resultType}>
          <GrLocation /> <Typography text="Location" variant="body1" />
        </div>
        <Typography text={location.country} variant="body1" />
        <div className={styles.availableActivities}>
          <Typography text={location.activities} variant="body2" />
          <Typography text={t("common.activities")} variant="body2" />
        </div>
      </div>
    </div>
  );
};
