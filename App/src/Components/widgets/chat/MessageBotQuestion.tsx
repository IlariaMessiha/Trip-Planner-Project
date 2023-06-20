import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { Avatar, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { TMessage } from "../../../types/TMessage";
import styles from "./MessageBotQuestion.module.css";
interface MessageBotQuestionProps {
    message: TMessage;
}
export const MessageBotQuestion: FC<MessageBotQuestionProps> = ({ message }) => {
    return (
        <div className={styles.container}>
            <div className={styles.chatbotMessage}>
                <Avatar>
                    <SmartToyOutlinedIcon />
                </Avatar>
                <div>
                    <Paper elevation={0} className={styles.chatbotQuestion}>
                        <Typography>{message.data.text}</Typography>
                    </Paper>
                    <Typography variant="caption" className={styles.date}>
                        {dayjs(message.sentAt).format("hh:mm a")}
                    </Typography>
                </div>
            </div>
        </div>
    );
};
