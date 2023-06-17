import { Button, CircularProgress } from "@mui/material";
import styles from "./ChatSubmit.module.css";
import { FC } from "react";

interface ChatSubmitProps {
    isSubmitting: boolean;
    onSubmit: () => void;
}

export const ChatSubmit: FC<ChatSubmitProps> = ({ onSubmit, isSubmitting }) => {
    const handleClick = () => {
        if (isSubmitting) return;
        onSubmit();
    };

    return (
        <div className={styles.actions}>
            <Button
                variant="outlined"
                onClick={handleClick}
                startIcon={isSubmitting && <CircularProgress size={16} color="primary" />}
            >
                See my Trip
            </Button>
        </div>
    );
};
