import { ChangeEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { Activity } from "../../models/Activity";
import { Location } from "../../models/Location";
import { InputText } from "../core/InputText";
import { Typography } from "../core/Typography";
import styles from "./SearchEngine.module.css";

interface SearchEngineProps {
  location: Location[];
  activity: Activity[];
}

export const SearchEngine: FC<SearchEngineProps> = ({ location }) => {
  const [fiteredData, setFilteredData] = useState<Location[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    const newFilter: Location[] = location.filter((value) => {
      if (
        value.name.toLowerCase().includes(searchWord) ||
        value.continent.toLowerCase().startsWith(searchWord) ||
        value.country.toLowerCase().startsWith(searchWord)
      ) {
        return value;
      }
    });

    // console.log(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    console.log(newFilter);
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
