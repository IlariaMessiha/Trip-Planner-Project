import { Autocomplete, Button, styled, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchQuery, SearchResult, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../../api/FetchData";

interface SearchFormProps {
    onSubmit: (results: SearchResult[], query: SearchQuery, error: string) => void;
}
const SearchButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
    padding: "10px",

    "&:hover": {
        backgroundColor: "white",
        color: "black",
        borderColor: "black",
    },
});
const TypeTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {},
    "& label.Mui-focused": {
        color: "black",
        fontSize: "Larger",
    },
});

export const SearchForm: FC<SearchFormProps> = ({ onSubmit }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [label, setLabel] = useState<string>();
    const [searchResultType, setSearchResultType] = useState<SearchResultType[] | undefined>(
        undefined
    );
    const resultOptions: SearchResultType[] = ["City", "Restaurant", "Hotel", "Attraction"];

    const getResData = async (query?: string, filters?: SearchResultType[]) => {
        if (query) {
            try {
                const _results = await fetchData.search({
                    label: query,
                    type: filters?.length !== 0 ? filters : searchResultType,
                });

                if (_results) {
                    const error = _results.length === 0 ? "No Items Found" : "";
                    onSubmit(
                        _results,
                        {
                            label: query,
                            type: searchResultType,
                        },
                        error
                    );
                }
            } catch (error) {
                console.error("search form error: ", error);
            }
        }
    };

    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        let searchString = `&filter=`;
        if (searchResultType) {
            searchString += searchResultType.join("&filter=");
        } else {
            searchString = "";
        }
        navigate({
            pathname: `/search`,
            search: `q=${label}${searchString}`,
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        const filters = params.getAll("filter");

        if (query !== null && filters.length !== 0) {
            const castedResults: SearchResultType[] = filters as SearchResultType[];
            setLabel(query);
            setSearchResultType(castedResults);
            getResData(query, castedResults);
        } else if (query !== null) {
            setLabel(query);
            setSearchResultType(undefined);
            getResData(query);
        }
    }, [window.location.search]);

    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchInputWrapper}>
                <InputText
                    label={t("common.search")}
                    onChange={({ target }) => {
                        console.log("on change text input", target.value.toLowerCase());
                        setLabel(target.value.toLowerCase());
                    }}
                    value={label || ""}
                />
            </div>
            <Autocomplete
                multiple
                disablePortal
                options={resultOptions}
                renderInput={params => <TypeTextField {...params} label={t("common.filterBy")} />}
                value={searchResultType || []}
                onChange={(event, values) => {
                    if (values.length > 0) {
                        setSearchResultType(values);
                    } else {
                        setSearchResultType(undefined);
                    }
                }}
                sx={{ width: 200 }}
            />
            <SearchButton variant="outlined" type="submit">
                {t("common.search")}
            </SearchButton>
        </form>
    );
};
