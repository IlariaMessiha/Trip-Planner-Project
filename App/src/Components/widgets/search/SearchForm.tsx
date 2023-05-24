import { Autocomplete, Button, styled, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchQuery, SearchResult, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { postData, PostData } from "../../../api/PostData";

interface SearchFormProps {
    initialLabel: string;
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

export const SearchForm: FC<SearchFormProps> = ({ initialLabel, onSubmit }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [label, setLabel] = useState<string>(initialLabel);

    const [searchResultType, setSearchResultType] = useState<SearchResultType[] | undefined>(
        undefined
    );
    const [results, setResults] = useState<SearchResult[] | undefined>(undefined);

    const resultOptions: SearchResultType[] = [
        "Country",
        "City",
        "Restaurant",
        "Hotel",
        "Attraction",
    ];

    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();

        if (label) {
            try {
                const _results = await postData.search({
                    label: label,
                    type: searchResultType,
                });
                setResults(_results);

                if (_results) {
                    const error = _results.length === 0 ? "No Items Found" : "";
                    onSubmit(
                        _results,
                        {
                            label: label,
                            type: searchResultType,
                        },
                        error
                    );
                }
            } catch (error) {
                console.error("search form error : ", error);
            }
        }
    };

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
