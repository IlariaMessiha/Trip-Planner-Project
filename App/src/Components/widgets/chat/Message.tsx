import { FC } from "react";
import styles from "./Message.module.css";
import { Button, Card, Typography } from "@mui/material";
import { TMessage, TMessageBotQuestionData } from "../../../types/TMessage";

interface MessageProps {
    message: TMessage;
}
export const Message: FC<MessageProps> = ({ message }) => {
    const isTMessageBotQuestionData = (
        message: TMessage
    ): message is TMessage<TMessageBotQuestionData> => {
        return message.dataType === "bot-question";
    };
    return (
        <div>
            {isTMessageBotQuestionData(message) && (
                <div className={styles.chatbotMessage}>
                    <Card elevation={0} className={styles.chatbotQuestion}>
                        <Typography>{message.data.text}</Typography>
                    </Card>
                    <div className={styles.choices}>
                        {message.data.answers.map((choice, i) => {
                            return (
                                <Button variant="contained" key={i} onClick={() => {}}>
                                    <Typography>{choice.text}</Typography>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* <div className={styles.userMessage}>
                    {answers &&
                        answers.map((answer, i) => (
                            <Card
                                key={i}
                                elevation={0}
                                sx={{ backgroundColor: "#1976d2" }}
                                className={styles.answer}
                            >
                                <Typography sx={{ color: "white" }}>{answer}</Typography>
                            </Card>
                        ))}
                </div> */}
        </div>
    );
};
