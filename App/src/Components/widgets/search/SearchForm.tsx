import { Autocomplete, Button, styled, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { SearchQuery, SearchResult, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { postData, PostData } from "../../../api/PostData";

type TypeOption = { id: SearchResultType; label: string };
type TypeOptionArray = TypeOption[];

interface SearchFormProps {
    initialLabel: string;
    onSubmit: (results: SearchResult[], query: SearchQuery, error: string) => void;
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
    const [typeOptionArray, setTypeArray] = useState<TypeOptionArray | null>();

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

        if (label) {
            console.log("label from handle submit : ", label);
            try {
                console.log("type option array : ", typeOptionArray);
                const results = await postData.search({
                    label: label,
                    type: typeOptionArray?.map(obj => obj.id),
                });

                console.log("resssssss: ", results);

                const error = results.length === 0 ? "No Items Found" : "";
                onSubmit(
                    results,
                    {
                        label: label,
                        type: typeOptionArray?.map(obj => obj.id),
                    },
                    error
                );
            } catch (error) {
                console.error("search form error : ", error);
            }
        }
    };

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const searchQuery = searchParams.get("q");
    //     const searchFilter = searchParams.get("filter");
    //     console.log(searchFilter);

    //     if (searchQuery) {
    //         const fetchDataAndUpdateState = async (searchQuery: SearchQuery) => {
    //             try {
    //                 const results = await postData.search(
    //                     searchQuery
    //                 );
    //                 onSubmit(results, {
    //                     label: searchQuery,
    //                     type: searchFilter as SearchResultType,
    //                 });
    //                 setLabel(searchQuery.label);
    //                 setTypeOption(typeOptions.find(type => type.id === searchType));
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         };
    //         // fetchDataAndUpdateState(searchQuery);
    //     }
    // }, [location.search]);

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
                options={typeOptions}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => <TypeTextField {...params} label={t("common.filterBy")} />}
                onChange={(event, values) => {
                    console.log("valsssssss : ", values);
                    if (values.length > 0) {
                        setTypeArray(values);
                    } else {
                        setTypeArray(null);
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
