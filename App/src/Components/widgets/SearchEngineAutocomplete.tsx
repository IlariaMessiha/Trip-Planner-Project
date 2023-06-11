import { FC } from "react";

interface SearchEngineProps {}

export const SearchEngineAutocomplete: FC<SearchEngineProps> = () => {
    return <div></div>;
    // const [results, setResults] = useState<SearchResult[]>([]);
    // const [query, setQuery] = useState<string>("");
    // const firstResults = results.slice(0, 4);
    // const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    //   const _query: string = target.value.toLowerCase();
    //   setQuery(_query);

    //   const _results = apiCalls.search({ label: _query });
    //   if (_query === "") {
    //     setResults([]);
    //   } else {
    //     setResults(_results);
    //   }
    // };

    // const navigate = useNavigate();
    // const onSubmit = (e: any) => {
    //   e.preventDefault();
    //   navigate(`/Search?q=${query}`);
    // };

    // return (
    //   <div className={styles.searchWrapper}>
    //     <div className={styles.inputAndResult}>
    //       <form onSubmit={onSubmit} className={styles.searchForm}>
    //         <InputTextSearch
    //           onChange={handleFilter}
    //           inputValue={query}
    //           className={styles.autoCompleteInput}
    //         />
    //       </form>
    //       <div className={styles.searchResult}>
    //         {firstResults.map(({ type, item }) => {
    //           return (
    //             <div key={`${type}-${item.id}`}>
    //               {type === "location" ? (
    //                 <div className={styles.searchResultElement}>
    //                   <GrLocation className={styles.itemIcon} />
    //                   <Link to={`/location/${item.id}`}>
    //                     <Typography
    //                       text={item.name}
    //                       className={styles.itemName}
    //                     />
    //                   </Link>
    //                 </div>
    //               ) : (
    //                 <div className={styles.searchResultElement}>
    //                   <img
    //                     src={item.coverImage}
    //                     className={styles.itemPhotos}
    //                     alt="Cover "
    //                   />
    //                   <Link to={`/activity/${item.id}`}>
    //                     <Typography
    //                       text={item.name}
    //                       className={styles.itemName}
    //                     />
    //                   </Link>
    //                 </div>
    //               )}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // );
};
