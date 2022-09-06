import { FC } from "react";

import { Typography } from "./Typography";
import styles from "./ActivitySearchResult.module.css";
import { Activity } from "../../models/Activity";
import { useTranslation } from "react-i18next";
import { FaRunning } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ActivitySearchResultProps {
  activity: Activity;
}
export const ActivitySearchResult: FC<ActivitySearchResultProps> = ({
  activity,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.searchResultElement}>
      {/* <div className={styles.rightSide}></div> */}

      <Link to={`/activity/${activity.id}`}>
        <img src={activity.coverImage} alt="Cover" />
      </Link>

      <div className={styles.rightSide}>
        <Link to={`/activity/${activity.id}`}>
          <Typography text={activity.name} variant="h3" />
        </Link>

        <div className={styles.resultType}>
          <FaRunning />
          <Typography text={t("common.activity")} variant="body1" />
        </div>
        <Typography text={activity.location.country} variant="body1" />
        <div className={styles.availableReviews}>
          <Typography text={activity.numberOfReviews} variant="body2" />
          <Typography text={t("common.reviews")} variant="body2" />
        </div>
      </div>
    </div>
  );
};
