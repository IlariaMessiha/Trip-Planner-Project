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
  const [results, setResults] = useState<(Location | Activity)[]>([]);
  const [query, setQuery] = useState<string>("");
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _query: string = target.value.toLowerCase();
    setQuery(_query);

    const _results = apiCalls.search(_query);
    if (_query === "") {
      setResults([]);
    } else {
      setResults(_results);
    }
  };

  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/SearchPage");
  };

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <InputText onChange={handleFilter} inputValue={query} />
        <div className={styles.searchResult}>
          {results.map((result) => {
            return (
              <a key={result.id} href={`/locationPage/${result.id}`}>
                <Typography
                  text={result.name}
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
