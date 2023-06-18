import { ChangeEvent, FC, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { autoCompleteData } from "../../api/autoCompleteGet";
import { AutoCompleteResult } from "../../types/dto/autocompleteType";
import { InputTextSearch } from "../core/InputTextSearch";
import styles from "./SearchEngineAutocomplete.module.css";

interface SearchEngineProps {}

const AUTOCOMPLETE_POLL_RATE = 2;

export const SearchEngineAutocomplete: FC<SearchEngineProps> = () => {
    const [results, setResults] = useState<AutoCompleteResult[]>([]);
    const [query, setQuery] = useState<string>("");
    const firstResults = results.slice(0, 4);

    const handleFilter = async ({ target }: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const _query: string = target.value.toLowerCase();
        setQuery(_query);

        if (_query.length >= AUTOCOMPLETE_POLL_RATE) {
            const _results = autoCompleteData.autoCompleteSearch(_query);
            setResults(await _results);
        } else {
            setResults([]);
        }
    };

    const navigate = useNavigate();
    const onSubmit = (e: any) => {
        e.preventDefault();
        navigate(`/search?q=${query}`);
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
                    {firstResults && firstResults.length > 0 ? (
                        firstResults.map(({ type, label, id }) => {
                            return (
                                <Link to={`/${type}/${id}`}>
                                    <div className={styles.searchResultElement}>
                                        <GrLocation className={styles.itemIcon} />
                                        {label}
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};
