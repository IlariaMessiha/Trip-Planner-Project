import { Button, Card, Typography } from "@mui/material";
import styles from "./MessageBotQuestion.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
import { TChatbotAnswer } from "../../../types/TChatbot";
interface MessageBotQuestionProps {
    message: TMessage;
    onAnswerSelect: (answerCode: string, answerText: string) => void;
}
export const MessageBotQuestion: FC<MessageBotQuestionProps> = ({ message, onAnswerSelect }) => {
    return (
        <div className={styles.chatbotMessage}>
            <Card elevation={0} className={styles.chatbotQuestion}>
                <Typography>{message.data.text}</Typography>
            </Card>
            {message.data.answers && (
                <div className={styles.choices}>
                    {message.data.answers.map((choice: TChatbotAnswer, i: any) => {
                        return (
                            <div>
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
        </div>
    );
};
