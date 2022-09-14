import { TextField } from "@mui/material";
import { ChangeEventHandler, FC } from "react";

interface InputTextSearchPageProps {
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export const InputText: FC<InputTextSearchPageProps> = ({
  onChange,
  value,
  label,
}) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
  />
);
