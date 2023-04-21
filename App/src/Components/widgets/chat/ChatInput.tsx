import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatInput.module.css";
import { FC, useState } from "react";
interface chatInputProps {
    onSubmit: (value: string) => void;
}
export const ChatInput: FC<chatInputProps> = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <form
            onSubmit={e => {
                onSubmit(inputValue);
                setInputValue("");
                e.preventDefault();
            }}
        >
            <TextField
                value={inputValue}
                label="Response"
                variant="outlined"
                fullWidth
                onChange={e => setInputValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end" type="submit">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};
