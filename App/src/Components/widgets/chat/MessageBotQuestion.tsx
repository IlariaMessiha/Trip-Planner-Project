import { Avatar, Button, Card, Typography } from "@mui/material";
import styles from "./MessageBotQuestion.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
import { TChatbotAnswer } from "../../../types/TChatbot";
import { blue } from "@mui/material/colors";
import dayjs from "dayjs";
interface MessageBotQuestionProps {
    message: TMessage;
    onAnswerSelect: (answerCode: string, answerText: string) => void;
}
export const MessageBotQuestion: FC<MessageBotQuestionProps> = ({ message, onAnswerSelect }) => {
    return (
        <div className={styles.container}>
            <div className={styles.chatbotMessage}>
                <Avatar>{message.sender.displayName[0]}</Avatar>
                <Card elevation={0} className={styles.chatbotQuestion}>
                    <Typography>{message.data.text}</Typography>
                </Card>
            </div>

            {message.data.answers && (
                <div className={styles.choices}>
                    {message.data.answers.map((choice: TChatbotAnswer, i: any) => {
                        return (
                            <div className={styles.choice}>
                                {choice.code === "submit" ? (
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => onAnswerSelect(choice.code, choice.text)}
                                    >
                                        <Typography>{choice.text}</Typography>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        key={i}
                                        onClick={() => onAnswerSelect(choice.code, choice.text)}
                                    >
                                        <Typography>{choice.text}</Typography>
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            <Typography variant="subtitle2">{dayjs(message.sentAt).format("hh:mm a")}</Typography>
        </div>
    );
};
