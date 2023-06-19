import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FC } from "react";

import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
interface InputTextSearchProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string;
  className?: string;
}
const SearchTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    fontSize: "Larger",
  },

  "& .MuiFilledInput-root": {
    border: "0px",
    backgroundColor: "white",

    "&:hover ": {
      backgroundColor: "white",
    },

    "&.Mui-focused ": {
      border: "0px",
      backgroundColor: "white",
    },
  },
});

export const InputTextSearch: FC<InputTextSearchProps> = ({
  onChange,
  inputValue,
  className = "",
}) => {
  const { t } = useTranslation();
  return (
    <Box className={className}>
      <SearchTextField
        label={t("user.searchFor")}
        fullWidth
        value={inputValue}
        onChange={onChange}
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Box>
  );
};
