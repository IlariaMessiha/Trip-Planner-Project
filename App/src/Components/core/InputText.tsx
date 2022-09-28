import { styled, TextField } from "@mui/material";
import { ChangeEventHandler, FC } from "react";

interface InputTextSearchPageProps {
  label: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
const LabelTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "black",
    fontSize: "Larger",
  },
});
export const InputText: FC<InputTextSearchPageProps> = ({
  onChange,
  value,
  label,
}) => (
  <LabelTextField
    fullWidth
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
  />
);
