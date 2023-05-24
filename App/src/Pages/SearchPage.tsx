import { useEffect, useState } from "react";

import { Container } from "../Components/core/layout/Container";

import { SearchForm } from "../Components/widgets/search/SearchForm";
import { SearchResult } from "../types/Search";
import styles from "./SearchPage.module.css";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../Components/widgets/pagination";
import { paginate } from "../utils/paginate";
import { SearchTypeItem } from "../Components/widgets/SearchTypeItem";

export const SearchPage = () => {
    const { initialSearchLabel } = useInitialSearchFromUrl();
    const [results, setResults] = useState<SearchResult[]>([]);
    const [unPagedResults, setUnPagedResults] = useState<SearchResult[]>([]);
    const [pagedResults, setPagedResults] = useState<SearchResult[]>([]);
    const [totalItemsCount, setTotalItemCount] = useState<number>(0);
    const [queryInfo, setQueryInfo] = useState<{}>();
    const { t } = useTranslation();
    const [pageError, setPageError] = useState<string>("");
    const pageSize = 3;
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        getUpdatedResults();
        setCurrentPage(1);
    }, [results]);

    useEffect(() => {
        setPagedResults(paginate(unPagedResults, currentPage, pageSize));
        console.log("paged results :  ", pagedResults);
    }, [currentPage, unPagedResults, pageError]);

    const handlePageChange = (page: number) => {
        console.log("page number : ", page);
        setCurrentPage(page);
    };

    const getUpdatedResults = () => {
        console.log("results", results);
        if (results.length > 0) {
            setTotalItemCount(results.length);
            setUnPagedResults(results);
            setPageError("");
        }
    };

    return (
        <>
            <Container className={styles.searchContainer}>
                <SearchForm
                    initialLabel={initialSearchLabel}
                    onSubmit={(results, query, error) => {
                        setResults(results);
                        setQueryInfo(query);
                        setPageError(error);
                    }}
                />
            </Container>
            <div
                style={{
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div className={styles.searchResultContainer}>
                    <Container className={styles.searchResult}>
                        <div>
                            {pageError ? (
                                <h1>{pageError}</h1>
                            ) : (
                                <>
                                    {pagedResults.map(item => {
                                        return (
                                            <div key={item.item.label}>
                                                <SearchTypeItem item={item} />
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </Container>
                </div>
                <PaginationComponent
                    itemsCount={totalItemsCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
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
