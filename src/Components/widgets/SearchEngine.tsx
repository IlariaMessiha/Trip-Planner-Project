import React, { KeyboardEventHandler } from "react";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../../api/api";
import { SearchResult } from "../../types/SearchResult";
import { Container } from "../core/Container";
import { InputTextSearchPage } from "../core/InputTextSearchPage";
import { Typography } from "../core/Typography";
import styles from "./SearchEngine.module.css";

export const SearchEngine = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string | undefined>("");
  const [filter, setFilter] = useState<string | undefined>("");
  const params = new URLSearchParams(window.location.search);
  const searchWord = params.get("q");
  const navigate = useNavigate();
  const filteredResults: SearchResult[] = [];
  React.useEffect(() => {
    if (searchWord) {
      setQuery(searchWord);
    }
  }, []);

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _query: string = target.value.toLowerCase();
    setQuery(_query);
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    console.log("hi");
    if (query) {
      navigate(`/Search?q=${query}`);
      const _results = apiCalls.search(query);

      if (query === "") {
        setResults([]);
      } else {
        if (filter === "location") {
          _results.map(({ item, type }) => {
            if (type === "location") {
              filteredResults.push({
                type: "location",
                item: item,
              });
            }
          });
          setResults(filteredResults);
        } else if (filter == "activities") {
          _results.map(({ type, item }) => {
            if (type === "activity") {
              filteredResults.push({
                type: "activity",
                item: item,
              });
            }
          });
          setResults(filteredResults);
        } else {
          setResults(_results);
        }
      }
    }
  };
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _filter: string = target.value.toLowerCase();
    setFilter(_filter);
  };

  return (
    <div>
      <Container>
        <form className={styles.searchContainer} onSubmit={onSubmit}>
          <InputTextSearchPage onChange={handleSearch} inputValue={query} />
          <label className={styles.filterForm}>
            <Typography
              text="Filter By:"
              variant="h4"
              className={styles.filterLabel}
            />

            <input
              list="filters"
              onChange={handleFilter}
              className={styles.filterInput}
            />
            <datalist id="filters">
              <option value="Location"></option>
              <option value="Activities"></option>
            </datalist>
          </label>

          <input type="submit" className={styles.searchButton} value="Search" />
        </form>
      </Container>
      <div className={styles.searchResultContainer}>
        <Container className={styles.searchResult}>
          {results.map(({ type, item }) => {
            return (
              <div
                key={`${type}-${item.id}`}
                className={styles.searchResultElement}
              >
                {type === "location" ? (
                  <div>
                    <a href={`/location/${item.id}`}>
                      <img src={item.coverImage} alt="" />
                      <Typography text={item.name} variant="h3" />
                    </a>
                  </div>
                ) : (
                  <div>
                    <a href={`/activity/${item.id}`}>
                      <img src={item.coverImage} alt="" />
                      <Typography text={item.name} variant="h3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </Container>
      </div>
    </div>
  );
};
