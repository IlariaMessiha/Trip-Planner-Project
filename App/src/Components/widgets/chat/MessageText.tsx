import { Avatar, Card, Typography } from "@mui/material";
import styles from "./MessageText.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
import { blue } from "@mui/material/colors";
import dayjs from "dayjs";
interface MessageTextProps {
    message: TMessage;
}
export const MessageText: FC<MessageTextProps> = ({ message }) => {
    return (
        <div>
            {message.sender.id === "0" ? (
                <>
                    <div className={styles.chatbotMessage}>
                        <Avatar>{message.sender.displayName[0]}</Avatar>
                        <Card elevation={0} className={styles.botText}>
                            <Typography>{message.data}</Typography>
                        </Card>
                    </div>
                    <Typography variant="subtitle2">
                        {dayjs(message.sentAt).format("hh:mm a")}
                    </Typography>
                </>
            ) : (
                <div className={styles.userMessageContainer}>
                    <div className={styles.userMessage}>
                        <Card
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
                        </Card>
                        <Avatar>{message.sender.displayName[0]}</Avatar>
                    </div>
                    <Typography variant="subtitle2">
                        {dayjs(message.sentAt).format("hh:mm a")}
                    </Typography>
                </div>
            )}
        </div>
    );
};
