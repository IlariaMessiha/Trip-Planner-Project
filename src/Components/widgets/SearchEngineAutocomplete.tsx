import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../../api/api";
import { SearchResult } from "../../types/SearchResult";
import { InputText } from "../core/InputText";
import { Typography } from "../core/Typography";
import styles from "./SearchEngineAutocomplete.module.css";

interface SearchEngineProps {}

export const SearchEngineAutocomplete: FC<SearchEngineProps> = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
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
  const onSubmit = (e: any) => {
    e.preventDefault();
    navigate(`/Search?q=${query}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <InputText onChange={handleFilter} inputValue={query} />
        <div className={styles.searchResult}>
          {results.map(({ type, item }) => {
            return (
              <div key={`${type}-${item.id}`}>
                {type === "location" ? (
                  <a href={`/location/${item.id}`}>
                    <Typography
                      text={item.name}
                      className={styles.searchResultElement}
                    />
                  </a>
                ) : (
                  <a href={`/activity/${item.id}`}>
                    <Typography
                      text={item.name}
                      className={styles.searchResultElement}
                    />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
