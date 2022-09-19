import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiCalls } from "../../../api/api";
import {
  SearchQuery,
  SearchResult,
  SearchResultType,
} from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";

type TypeOption = { id: SearchResultType; label: string };

interface SearchFormProps {
  initialLabel: string;
  onSubmit: (results: SearchResult[], query: SearchQuery) => void;
}

export const SearchForm: FC<SearchFormProps> = ({ initialLabel, onSubmit }) => {
  const { t } = useTranslation();

  const [label, setLabel] = useState<string>(initialLabel);
  const [typeOption, setTypeOption] = useState<TypeOption | null>();

  const typeOptions: TypeOption[] = [
    { id: "location", label: t("common.locations") },
    { id: "activity", label: t("common.activities") },
  ];
  useEffect(() => {
    setLabel(initialLabel);
  }, [initialLabel]);

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    const results = apiCalls.search({ label, type: typeOption?.id });

    onSubmit(results, { label, type: typeOption?.id });
  };

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
        value={typeOption}
        disablePortal
        options={typeOptions}
        renderInput={(params) => (
          <TextField {...params} label={t("common.filterBy")} />
        )}
        onChange={(event, newTypeOption) => {
          setTypeOption(newTypeOption);
        }}
        sx={{ width: 300 }}
      />
      <Button variant="outlined" type="submit">
        {t("common.search")}
      </Button>
    </form>
  );
};
