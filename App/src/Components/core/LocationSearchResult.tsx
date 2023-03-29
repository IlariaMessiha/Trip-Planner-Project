import { FC, useState } from "react";
import { Typography } from "./Typography";
import { GrLocation } from "react-icons/gr";
import styles from "./LocationSearchResult.module.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/FetchData";
import React from "react";

interface LocationSearchResultProps {
    item: any;
    type: string;
}
export const LocationSearchResult: FC<LocationSearchResultProps> = ({ item, type }) => {
    
    const [locationInfo, setLocationInfo] = useState<string>("");
    //const [locationActivities, setLocationActivities] = useState<Activity[] | []>([]);
    React.useEffect(() => {
        const onMount = async () => {
            if (type === "city") {
                const info = await fetchData.getCountryForCity(item.id);
                 setLocationInfo(info.label);
                console.log(locationInfo);
            } else {
                setLocationInfo("");
            }
        };
        onMount();
    }, []);

    const { t } = useTranslation();
    if (!item) {
        return null;
    }
    return (
        <div className={styles.searchResultElement}>
            {/* <div className={styles.rightSide}></div> */}

            <Link to={`/location/${item.id}`}>
                <img
                    src={
                        "https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk1NzY0MDg3NTEzMTYzNDEy/gettyimages-142198198.jpg"
                    }
                    alt="Cover"
                />
            </Link>

            <div className={styles.rightSide}>
                <Link to={`/location/${item.id}`}>
                    <Typography text={item.label} variant="h3" className={styles.title} />
                </Link>

                <div className={styles.resultType}>
                    <GrLocation /> <Typography text="Location" variant="body1" />
                </div>
                <Typography text={locationInfo} variant="body1" />
                <div className={styles.availableActivities}>
                    {/* {<Typography text={locationActivities.length} variant="body2" />} */}
                    <Typography text={t("common.activities")} variant="body2" />
                </div>
            </div>
        </div>
    );
};
