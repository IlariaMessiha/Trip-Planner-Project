import { Box, Icon, InputBase, Paper, TextField } from "@mui/material";
import { ChangeEventHandler, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./InputTextSearchPage.module.css";
interface InputTextSearchPageProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string | undefined;
}
export const InputTextSearchPage: FC<InputTextSearchPageProps> = ({
  onChange,
  inputValue,
}) => {
  return (
    <Paper
      className={styles.container}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 600 }}
    >
      <InputBase
        className={styles.searchBar}
        value={inputValue}
        onChange={onChange}
        placeholder="Search For"
        sx={{ ml: 1, flex: 1, width: 400 }}
      />
      <Icon sx={{ p: "10px" }} aria-label="search">
        <SearchIcon sx={{ fontSize: "larger" }} />
      </Icon>
    </Paper>
  );
};
