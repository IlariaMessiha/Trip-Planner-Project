import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ActivitySearchResult } from "../Components/core/ActivitySearchResult";
import { Container } from "../Components/core/layout/Container";
import { LocationSearchResult } from "../Components/core/LocationSearchResult";
import { SearchForm } from "../Components/widgets/search/SearchForm";
import { SearchResult } from "../types/Search";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
    return <div></div>;
    // const [results, setResults] = useState<SearchResult[]>([]);
    // const navigate = useNavigate();
    // const { initialSearchLabel } = useInitialSearchFromUrl();
    // useEffect(() => {
    //     const _results = apiCalls.search({
    //         label: initialSearchLabel,
    //     });
    //     if (initialSearchLabel === "") {
    //         setResults([]);
    //     } else {
    //         setResults(_results);
    //     }
    // }, [initialSearchLabel]);
    // return (
    //     <>
    //         <Container>
    //             <SearchForm
    //                 initialLabel={initialSearchLabel}
    //                 onSubmit={(results, query) => {
    //                     setResults(results);
    //                     navigate(`/Search?q=${query.label}`);
    //                 }}
    //             />
    //         </Container>
    //         <div className={styles.searchResultContainer}>
    //             <Container className={styles.searchResult}>
    //                 {results.map(({ type, item }) => {
    //                     return (
    //                         <div key={`${type}-${item.id}`}>
    //                             {type === "location" ? (
    //                                 <LocationSearchResult id={item.id} key={item.id} />
    //                             ) : (
    //                                 <ActivitySearchResult id={item.id} key={item.id} />
    //                             )}
    //                         </div>
    //                     );
    //                 })}
    //             </Container>
    //         </div>
    //     </>
    // );
};

const useInitialSearchFromUrl = () => {
    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchWord = params.get("q");
        if (searchWord) {
            setSearchWord(searchWord);
        }
    }, []);

    return { initialSearchLabel: searchWord };
};
