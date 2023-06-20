import { Avatar, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { TMessage } from "../../../types/TMessage";
import styles from "./MessageText.module.css";

import dayjs from "dayjs";
interface MessageTextProps {
    message: TMessage;
}
export const MessageText: FC<MessageTextProps> = ({ message }) => {
    return (
        <div className={styles.container}>
            <div className={styles.userMessage}>
                <div>
                    <Paper
                        elevation={0}
                        className={styles.userText}
                        sx={{
                            backgroundColor: "#1976d2",
                            padding: "8px 16px",
                            borderRadius: "2",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white",
                            }}
                        >
                            {message.data}
                        </Typography>
                    </Paper>
                    <Typography variant="caption" className={styles.date}>
                        {dayjs(message.sentAt).format("hh:mm a")}
                    </Typography>
                </div>
                <Avatar>{message.sender.displayName[0]}</Avatar>
            </div>
        </div>
    );
};
