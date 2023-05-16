import { Autocomplete, Button, styled, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchQuery, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";
import { fetchData } from "../../../api/FetchData";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

type TypeOption = { id: SearchResultType; label: string };
type TypeOptionArray = TypeOption[];

interface SearchFormProps {
    initialLabel: string;
    onSubmit: (results: {}, query: SearchQuery) => void;
}
const SearchButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
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
    const [typeOption, setTypeOption] = useState<TypeOption | null>(null);
    const [typeOptionArray, setTypeArray] = useState<TypeOptionArray>();

    const location = useLocation();

    const typeOptions: TypeOption[] = [
        { id: "Country", label: t("common.country") },
        { id: "City", label: t("common.city") },
        { id: "Attraction", label: t("common.attraction") },
        { id: "Hotel", label: t("common.hotel") },
        { id: "Restaurant", label: t("common.restaurant") },
    ];

    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        const filters = typeOptionArray ?? [];
        let filterString = "";
        filters.forEach(filter => {
            filterString += filter.id.toLowerCase() + ",";
        });
        const finalFilters = filterString.slice(0, -1);
        console.log(finalFilters);

        if (finalFilters.length !== 0) {
            navigate(`/search?q=${label}&filter=${finalFilters}`);
        } else {
            navigate(`/search?q=${label}`);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get("q");
        const searchFilter = searchParams.get("filter");
        console.log(searchFilter);

        if (searchQuery) {
            const fetchDataAndUpdateState = async (label: string) => {
                try {
                    const results = await fetchData.getSearchResults(
                        searchQuery,
                        searchFilter || ""
                    );
                    onSubmit(results, {
                        label: searchQuery,
                        type: searchFilter as SearchResultType,
                    });
                    setLabel(searchQuery);
                    setTypeOption(typeOptions.find(type => type.id === searchType));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchDataAndUpdateState(searchQuery);
        }
    }, [location.search]);

    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchInputWrapper}>
                <InputText
                    label={t("common.search")}
                    onChange={({ target }) => {
                        setLabel(target.value.toLowerCase());
                    }}
                    value={label || ""}
                />
            </div>
            <Autocomplete
                multiple
                disablePortal
                options={typeOptions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => <TypeTextField {...params} label={t("common.filterBy")} />}
                onChange={(event, values) => {
                    // console.log(values);

                    setTypeArray(values);
                }}
                sx={{ width: 200 }}
            />
            <SearchButton variant="outlined" type="submit">
                {t("common.search")}
            </SearchButton>
        </form>
    );
};
