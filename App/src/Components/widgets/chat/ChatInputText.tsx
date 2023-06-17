import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";

interface ChatInputTextProps {
    onSubmit: (value: string) => void;
}
export const ChatInputText: FC<ChatInputTextProps> = ({ onSubmit }) => {
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
                autoFocus
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
