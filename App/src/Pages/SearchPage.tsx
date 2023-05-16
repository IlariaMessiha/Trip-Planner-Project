import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivitySearchResult } from "../Components/core/ActivitySearchResult";
import { Container } from "../Components/core/layout/Container";
import { LocationSearchResult } from "../Components/core/LocationSearchResult";
import { SearchForm } from "../Components/widgets/search/SearchForm";
import { SearchResult } from "../types/Search";
import styles from "./SearchPage.module.css";
import { useTranslation } from "react-i18next";
import { ListGroup } from "../Components/widgets/ListGroup";
// import { Pagination } from "../Components/widgets/pagination";
// import { paginate } from "../utils/paginate";
import { styled } from "@mui/material";
export const SearchPage = () => {
    // type ResultsType = {
    //     [key: string]: any[];
    // };
    // const { initialSearchLabel } = useInitialSearchFromUrl();
    // const [results, setResults] = useState<ResultsType>({});
    // const [unPagedResults, setUnPagedResults] = useState<ResultsType[]>([]);
    // const [pagedResults, setPagedResults] = useState<ResultsType[]>([]);
    // const [totalItemsCount, setTotalItemCount] = useState<number>(0);
    // const [queryInfo, setQueryInfo] = useState<{}>();
    // const { t } = useTranslation();
    // const [pageError, setPageError] = useState<string>("");
    // const pageSize = 3;
    // const [currentPage, setCurrentPage] = useState<number>(1);

    // useEffect(() => {
    //     getUpdatedResults();
    //     setCurrentPage(1);
    // }, [results]);

    // useEffect(() => {
    //     setPagedResults(paginate(unPagedResults, currentPage, pageSize));
    // }, [currentPage, unPagedResults, pageError]);

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    // };

    // const getUpdatedResults = () => {
    //     const arr = [];
    //     console.log("results", results);
    //     if (!results.error) {
    //         for (let key in results) {
    //             for (let i = 0; i < results[key].length; i++) {
    //                 const obj = { ...results[key][i], type: key };
    //                 arr.push(obj);
    //             }
    //         }
    //         setTotalItemCount(arr.length);
    //         setUnPagedResults(arr);
    //         setPageError("");
    //     } else {
    //         setPageError(String(results.error));
    //     }
    // };

    // const getPagedData = () => {};

    return (
        <div></div>
        // <>
        //     <Container>
        //         <SearchForm
        //             initialLabel={initialSearchLabel}
        //             onSubmit={(results, query) => {
        //                 setResults(results);
        //                 setQueryInfo(query);
        //                 //console.log(query.label, " -----", query.type);
        //                 // navigate(`/search?q=${query.label}`);
        //             }}
        //         />
        //     </Container>
        //     <div
        //         style={{
        //             marginBottom: "10px",
        //             display: "flex",
        //             flexDirection: "column",
        //             alignItems: "center",
        //         }}
        //     >
        //         <div className={styles.searchResultContainer}>
        //             <Container className={styles.searchResult}>
        //                 <div>
        //                     {pageError ? (
        //                         <h1>{results.error}</h1>
        //                     ) : (
        //                         <>
        //                             {pagedResults.map(item => {
        //                                 return (
        //                                     <div>
        //                                         {String(item.type) === "country" ||
        //                                         String(item.type) === "city" ? (
        //                                             <LocationSearchResult
        //                                                 item={item}
        //                                                 type={String(item.type)}
        //                                             />
        //                                         ) : (
        //                                             <ActivitySearchResult
        //                                                 item={item}
        //                                                 type={String(item.type)}
        //                                             />
        //                                         )}
        //                                     </div>
        //                                 );
        //                             })}
        //                         </>
        //                     )}
        //                 </div>
        //             </Container>
        //         </div>
        //         {/* <Pagination
        //             itemsCount={totalItemsCount}
        //             pageSize={pageSize}
        //             currentPage={currentPage}
        //             onPageChange={handlePageChange}
        //         /> */}
        //     </div>
        // </>
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
