import React, { KeyboardEventHandler } from "react";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../../api/api";
import { Activity } from "../../models/Activity";
import { Location } from "../../models/Location";
import { SearchResult } from "../../types/SearchResult";
import { ActivitySearchResult } from "../core/ActivitySearchResult";
import { Container } from "../core/Container";
import { InputTextSearchPage } from "../core/InputTextSearchPage";
import { LocationSearchResult } from "../core/LocationSearchResult";
import { Typography } from "../core/Typography";
import styles from "./SearchEngine.module.css";

export const SearchEngine = () => {
  const { t } = useTranslation();
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
      const _results = apiCalls.search(searchWord);
      setResults(_results);
    }
  }, [searchWord]);

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _query: string = target.value.toLowerCase();
    setQuery(_query);
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();

    if (query) {
      navigate(`/Search?q=${query}`);
      const _results = apiCalls.search(query);
      console.log(filter);
      if (query === "") {
        setResults([]);
      } else {
        if (filter === "Locations" || filter === "Ubicaciones") {
          console.log("hi");
          _results.map(({ item, type }) => {
            if (type === "location") {
              filteredResults.push({
                type: "location",
                item: item,
              });
            }
          });
          setResults(filteredResults);
        } else if (
          filter === "Activities" ||
          filter === "Actividades" ||
          filter === "Activités"
        ) {
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
          console.log("hi");
          setResults(_results);
        }
      }
    }

    // console.log(query);
    // console.log(results);
  };
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const _filter: string = target.value;
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
              className={styles.filterInput}
              onChange={handleFilter}
            />
            <datalist id="filters">
              <option value={t(`common.locations`)}></option>
              <option value={t("common.activities")}></option>
            </datalist>
          </label>

          <input type="submit" className={styles.searchButton} value="Search" />
        </form>
      </Container>
      <div className={styles.searchResultContainer}>
        <Container className={styles.searchResult}>
          {results.map(({ type, item }) => {
            return (
              <div key={`${type}-${item.id}`}>
                {type === "location" ? (
                  <LocationSearchResult
                    location={item as Location}
                    key={item.id}
                  />
                ) : (
                  <ActivitySearchResult
                    activity={item as Activity}
                    key={item.id}
                  />
                )}
              </div>
            );
          })}
        </Container>
      </div>
    </div>
  );
};
