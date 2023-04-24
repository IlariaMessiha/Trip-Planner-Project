import { FC } from "react";
import { TMessage, TMessageBotQuestionData } from "../../../types/TMessage";
import { MessageBotQuestion } from "./MessageBotQuestion";
import { MessageText } from "./MessageText";
import styles from "./ChatMessages.module.css";

interface ChatMessagesProps {
    messages: TMessage[];
    onAnswerSelect: (answerCode: string, answerText: string) => void;
}
const isTMessageBotQuestionData = (
    message: TMessage
): message is TMessage<TMessageBotQuestionData> => {
    return message.dataType === "bot-question";
};
export const ChatMessages: FC<ChatMessagesProps> = ({ messages, onAnswerSelect }) => {
    return (
        <div className={styles.container}>
            {messages.map((message, i) => {
                return (
                    <div key={i} className={styles.message}>
                        {isTMessageBotQuestionData(message) ? (
                            <div className={styles.botMessage}>
                                <MessageBotQuestion
                                    message={message}
                                    onAnswerSelect={onAnswerSelect}
                                />
                            </div>
                        ) : (
                            <div className={styles.text}>
                                <MessageText message={message} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
