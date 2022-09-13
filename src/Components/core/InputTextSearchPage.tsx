import { Icon, InputBase, styled, TextField } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

import styles from "./InputTextSearchPage.module.css";

interface InputTextSearchPageProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string | undefined;
}
const SearchTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    width: "600px",
  },
});
export const InputTextSearchPage: FC<InputTextSearchPageProps> = ({
  onChange,
  inputValue,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <SearchTextField
        className={styles.container}
        variant="outlined"
        label={t("common.search for")}
        value={inputValue}
        onChange={onChange}
      />

      <Icon sx={{ p: "10px" }} aria-label="search">
        <SearchIcon sx={{ fontSize: "larger" }} />
      </Icon>
    </div>
  );
};
