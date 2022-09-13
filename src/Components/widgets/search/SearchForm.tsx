import { Autocomplete, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../../../api/api";
import { SearchResult, SearchResultType } from "../../../types/Search";
import { InputText } from "../../core/InputText";
import styles from "./SearchForm.module.css";

type TypeOption = { id: SearchResultType; label: string };

export const SearchForm = () => {
  const { t } = useTranslation();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [label, setLabel] = useState<string>("");
  const [typeOption, setTypeOption] = useState<TypeOption | null>();

  const typeOptions: TypeOption[] = [
    { id: "location", label: t("common.locations") },
    { id: "activity", label: t("common.activities") },
  ];
  const params = new URLSearchParams(window.location.search);
  const searchWord = params.get("q");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (searchWord) {
      setLabel(searchWord);
      const _results = apiCalls.search({
        label: searchWord,
      });
      setResults(_results);
    }
  }, [searchWord]);

  const onSubmit = (e: any): void => {
    e.preventDefault();

    navigate(`/Search?q=${label}`);
    const _results = apiCalls.search({ label, type: typeOption?.id });
    setResults(_results);
  };

  return (
    <form className={styles.searchContainer} onSubmit={onSubmit}>
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
