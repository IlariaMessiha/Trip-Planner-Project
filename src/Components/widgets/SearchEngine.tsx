import { ChangeEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { apiCalls } from "../../api/api";
import { activities } from "../../mocks/activities";
import { Activity } from "../../models/Activity";
import { Location } from "../../models/Location";
import { InputText } from "../core/InputText";
import { Typography } from "../core/Typography";
import styles from "./SearchEngine.module.css";

interface SearchEngineProps {
  location: Location[];
  activity: Activity[];
}

export const SearchEngine: FC<SearchEngineProps> = ({ location, activity }) => {
  const [fiteredData, setFilteredData] = useState<(Location | Activity)[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const results = apiCalls.search(searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(results);
    }
  };

  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/SearchPage");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <InputText onChange={handleFilter} inputValue={wordEntered} />
        <div className={styles.searchResult}>
          {fiteredData.map((value) => {
            return (
              <a key={value.id} href={`/locationPage/${value.id}`}>
                <Typography
                  text={value.name}
                  className={styles.searchResultElement}
                />
              </a>
            );
          })}
        </div>
      </form>
    </div>
  );
};
