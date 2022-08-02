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
  const params = new URLSearchParams(window.location.search);
  const searchWord = params.get("q");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (searchWord) {
      setQuery(searchWord);

      if (query) {
        const _results = apiCalls.search(query);
        if (query === "") {
          setResults([]);
        } else {
          setResults(_results);
        }
      }
    }
  }, [searchWord]);

  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _query: string = target.value.toLowerCase();
    setQuery(_query);
  };
  const handleOnClick = (event: MouseEvent<HTMLInputElement>): void => {
    if (query) {
      navigate(`/Search?q=${query}`);

      const _results = apiCalls.search(query);
      if (query === "") {
        setResults([]);
      } else {
        setResults(_results);
      }
    }
  };
  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (query) {
      navigate(`/Search?q=${query}`);

      const _results = apiCalls.search(query);
      if (query === "") {
        setResults([]);
      } else {
        setResults(_results);
      }
    }
  };

  return (
    <div>
      <Container>
        <form className={styles.searchContainer} onSubmit={onSubmit}>
          <InputTextSearchPage onChange={handleFilter} inputValue={query} />
          <input
            type="button"
            className={styles.searchButton}
            value="Search"
            onClick={handleOnClick}
          />
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
