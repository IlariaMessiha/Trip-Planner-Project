import { Avatar, Card, Typography } from "@mui/material";
import styles from "./MessageText.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
import { blue } from "@mui/material/colors";
interface MessageTextProps {
    message: TMessage;
}
export const MessageText: FC<MessageTextProps> = ({ message }) => {
    return (
        <div>
            {message.sender.id === "0" ? (
                <div className={styles.chatbotMessage}>
                    <Avatar sx={{ bgcolor: blue }}>{message.sender.displayName[0]}</Avatar>
                    <Card elevation={0} className={styles.botText}>
                        <Typography>{message.data}</Typography>
                    </Card>
                </div>
            ) : (
                <div className={styles.userMessage}>
                    <Card
                        elevation={0}
                        className={styles.userText}
                        sx={{ backgroundColor: "#1976d2", padding: "8px 16px", borderRadius: "2" }}
                    >
                        <Typography
                            sx={{
                                color: "white",
                            }}
                        >
                            {message.data}
                        </Typography>
                    </Card>
                    <Avatar sx={{ bgcolor: blue }}>{message.sender.displayName[0]}</Avatar>
                </div>
            )}
        </div>
    );
};
