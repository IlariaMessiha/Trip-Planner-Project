import { ChangeEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Location } from "../models/Location";
import { SearchPage } from "../Pages/SearchPage";
import { Activity } from "../models/Activity";
import { Link as RouterLink } from "react-router-dom";
import styles from "./SearchEngine.module.css";
export const SearchEngine: FC<{
  location: Location[];
  activity: Activity[];
}> = ({ location }) => {
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

  return (
    <div className={styles.search}>
      <form>
        <div className={styles.searchContainer}>
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
          <input
            type="search"
            className={styles.searchBar}
            value={wordEntered}
            onChange={handleFilter}
          />
        </div>
        <div className={styles.searchResult}>
          {fiteredData.map((value, key) => {
            return (
              <a href="/locationPage">
                <div key={key} className={styles.resultElement}>
                  {value.name}
                </div>
              </a>
            );
          })}
        </div>
      </form>
    </div>
  );
};
