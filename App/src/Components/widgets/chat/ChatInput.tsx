import { IconButton, InputAdornment, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from "./ChatInput.module.css";
export const ChatInput = () => {
    return (
        <form>
            <TextField
                label="Response"
                variant="outlined"
                fullWidth
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
