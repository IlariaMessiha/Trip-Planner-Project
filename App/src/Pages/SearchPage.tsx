import { useEffect, useState } from "react";

import { Container } from "../Components/core/layout/Container";

import { useNavigate } from "react-router-dom";
import { SearchTypeItem } from "../Components/widgets/SearchTypeItem";
import PaginationComponent from "../Components/widgets/pagination";
import { SearchForm } from "../Components/widgets/search/SearchForm";
import { fetchData } from "../api/FetchData";
import { SearchQuery, SearchResult, SearchResultType } from "../types/Search";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
    const [results, setResults] = useState<SearchResult[]>([]);

    const [totalItemsCount, setTotalItemCount] = useState<number>(0);
    const [pageError, setPageError] = useState<string>("");
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (results.length > 0) {
            setTotalItemCount(results.length);

            setPageError("");
        }
        setCurrentPage(1);
    }, [results]);

    useEffect(() => {
        const onMount = async () => {
            const params = new URLSearchParams(window.location.search);
            const query = params.get("q");
            if (!query) return null;
            const filters = params.getAll("filter") as SearchResultType[];
            const _results = await fetchData.search({
                label: query,
                type: filters,
            });
            setResults(_results);
        };
        onMount();
    }, []);

    const handlePageChange = (page: number) => {
        console.log("page number : ", page);
        setCurrentPage(page);
    };
    const onSubmit = async (query: SearchQuery) => {
        let searchString = `&filter=`;
        if (query.type) {
            searchString += query.type.join("&filter=");
        } else {
            searchString = "";
        }
        navigate({
            pathname: `/search`,
            search: `q=${query.label}${searchString}`,
        });
        const _results = await fetchData.search(query);
        setResults(_results);
    };

    return (
        <>
            <Container className={styles.searchContainer}>
                <SearchForm onSubmit={onSubmit} />
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
                                    {results.map(item => {
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
