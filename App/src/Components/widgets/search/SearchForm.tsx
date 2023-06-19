import { Autocomplete, Button, styled, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchQuery, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
    // onSubmit: (results: SearchResult[], query: SearchQuery, error: string) => void;
    onSubmit: (query: SearchQuery) => void;
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

    const [label, setLabel] = useState<string>();

    const [searchResultType, setSearchResultType] = useState<SearchResultType[] | undefined>(
        undefined
    );
    const resultOptions: SearchResultType[] = ["City", "Restaurant", "Hotel", "Attraction"];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!label) return null;
        onSubmit({
            label: label,
            type: searchResultType,
        });
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
