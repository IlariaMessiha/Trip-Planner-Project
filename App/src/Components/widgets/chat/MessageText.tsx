import { Card, Typography } from "@mui/material";
import styles from "./MessageText.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
interface MessageTextProps {
    message: TMessage;
}
export const MessageText: FC<MessageTextProps> = ({ message }) => {
    return (
        <div>
            {message.sender.id === "0" ? (
                <Card elevation={0} className={styles.botText}>
                    <Typography>{message.data}</Typography>
                </Card>
            ) : (
                <Card elevation={0} className={styles.userText}>
                    <Typography sx={{ color: "white" }}>{message.data}</Typography>
                </Card>
            )}
        </div>
    );
};
