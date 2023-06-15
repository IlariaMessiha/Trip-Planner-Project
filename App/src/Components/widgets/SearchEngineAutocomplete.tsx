import { ChangeEvent, FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { InputTextSearch } from "../core/InputTextSearch";
import { Typography } from "../core/Typography";
import styles from "./SearchEngineAutocomplete.module.css";
import { autoCompleteData } from "../../api/autoCompleteGet";
import { AutoCompleteResult } from "../../types/dto/autocompleteType";

interface SearchEngineProps {}

export const SearchEngineAutocomplete: FC<SearchEngineProps> = () => {

    const [results, setResults] = useState<AutoCompleteResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const firstResults = results.slice(0, 4);

    const handleFilter = async ({ target }: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const _query: string = target.value.toLowerCase();
      setQuery(_query);
      
      const _results = autoCompleteData.autoCompleteSearch(_query);

      if (_query === "") {
        setResults([]); 
      } else {
        setResults(await _results);
      }
    };

    const navigate = useNavigate();
    const onSubmit = (e: any) => {
      e.preventDefault();
      navigate(`/Search?q=${query}`);
    };

    return (
      <div className={styles.searchWrapper}>
        <div className={styles.inputAndResult}>
          <form onSubmit={onSubmit} className={styles.searchForm}>
            <InputTextSearch
              onChange={handleFilter}
              inputValue={query}
              className={styles.autoCompleteInput}
            />
          </form>
          <div className={styles.searchResult}>

          {firstResults && firstResults.length > 0 ? firstResults.
            map(({ type, label, id })  => {
              return (
                <div className={styles.searchResultElement}>
                <GrLocation className={styles.itemIcon} />
                {label}
              </div>
              );
            }): (<div></div>)}

            {/* {firstResults.map(({ type,  }) => {
              return (
                <div key={`${type}-${item.id}`}>
                  {type === "location" ? (
                    <div className={styles.searchResultElement}>
                      <GrLocation className={styles.itemIcon} />
                      <Link to={`/location/${item.id}`}>
                        <Typography
                          text={item.name}
                          className={styles.itemName}
                        />
                      </Link>
                    </div>
                  ) : (
                    <div className={styles.searchResultElement}>
                      <img
                        src={item.coverImage}
                        className={styles.itemPhotos}
                        alt="Cover "
                      />
                      <Link to={`/activity/${item.id}`}>
                        <Typography
                          text={item.name}
                          className={styles.itemName}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    );
};
