import { useEffect, useState } from "react";

import { Container } from "../Components/core/layout/Container";

import { SearchForm } from "../Components/widgets/search/SearchForm";
import { SearchQuery, SearchResult, SearchResultType } from "../types/Search";
import styles from "./SearchPage.module.css";
import PaginationComponent from "../Components/widgets/pagination";
import { paginate } from "../utils/paginate";
import { SearchTypeItem } from "../Components/widgets/SearchTypeItem";
import { fetchData } from "../api/FetchData";
import { useNavigate } from "react-router-dom";
interface searchPageProps {
    onSubmit: (query: SearchQuery) => void;
}
export const SearchPage = () => {
    // const { initialSearchLabel } = useInitialSearchFromUrl();
    // const storedResults = localStorage.getItem("searchResults");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState<SearchQuery | undefined>(undefined);
    const [unPagedResults, setUnPagedResults] = useState<SearchResult[]>([]);
    const [pagedResults, setPagedResults] = useState<SearchResult[]>([]);
    const [totalItemsCount, setTotalItemCount] = useState<number>(0);
    const [pageError, setPageError] = useState<string>("");
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (results.length > 0) {
            setTotalItemCount(results.length);
            setUnPagedResults(results);
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
            // setPagedResults(paginate(unPagedResults, currentPage, pageSize));
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
