import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivitySearchResult } from "../Components/core/ActivitySearchResult";
import { Container } from "../Components/core/layout/Container";
import { LocationSearchResult } from "../Components/core/LocationSearchResult";
import { SearchForm } from "../Components/widgets/search/SearchForm";
import { SearchResult } from "../types/Search";
import styles from "./SearchPage.module.css";
import { useTranslation } from "react-i18next";

export const SearchPage = () => {
    type ResultsType = {
        [key: string]: any[];
    };
    const { initialSearchLabel } = useInitialSearchFromUrl();
    const [results, setResults] = useState<ResultsType>({});
    const [queryInfo, setQueryInfo] = useState<{}>();
    const { t } = useTranslation();

    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <>
            <Container>
                <SearchForm
                    initialLabel={initialSearchLabel}
                    onSubmit={(results, query) => {
                        setResults(results);
                        setQueryInfo(query);
                        //console.log(query.label, " -----", query.type);
                        // navigate(`/search?q=${query.label}`);
                    }}
                />
            </Container>
            <div className={styles.searchResultContainer}>
                <Container className={styles.searchResult}>
                    {Object.entries(results).map(([type, items]) => {
                        console.log(typeof type, " type objjjjj");
                        return (
                            <div key={type}>
                                {type === "error" ? (
                                    <h1>{results.error}</h1>
                                ) : (
                                    <>
                                        <h2>{t(String(`common.${type}`))}</h2>
                                        {items.map(item => {
                                            return (
                                                <div key={item.id}>
                                                    {type === "country" || type === "city" ? (
                                                        <LocationSearchResult
                                                            item={item}
                                                            type={type}
                                                        />
                                                    ) : (
                                                        <ActivitySearchResult
                                                            item={item}
                                                            type={type}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </Container>
            </div>
        </>
    );
};

const useInitialSearchFromUrl = () => {
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchWord = params.get("q");
        console.log(searchWord, "from oustide");
        if (searchWord) {
            setSearchWord(searchWord);
        }
    }, []);

    return { initialSearchLabel: searchWord };
};
