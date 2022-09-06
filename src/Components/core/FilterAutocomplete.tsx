import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "./Typography";
interface FilterAutocompleteProps {
  activity: string;
  location: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}
export const FilterAutocomplete: FC<FilterAutocompleteProps> = ({
  activity,
  location,
  onChange,
}) => {
  return (
    <Autocomplete
      disablePortal
      options={[activity, location]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Filter By" />}
    />
  );
};
